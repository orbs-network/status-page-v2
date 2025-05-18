/**
 * Copyright 2020 the orbs-network/status-page-v2 authors
 * This file is part of the orbs-network/status-page-v2 library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import _ from 'lodash';
import fetch from 'node-fetch';
import sslChecker from 'ssl-checker';
import {Configuration, NetworkType} from '../config';
import {fetchJson, isStaleTime, timeAgoText} from '../helpers';
import * as Logger from '../logger';
import {
  GenStatus,
  Guardian,
  Guardians,
  HealthLevel,
  Model,
  nodeServiceBuilder,
  nodeServiceCopy,
  nodeVirtualChainBuilder,
  nodeVirtualChainCopy,
  Service,
  StatusName,
  VirtualChain
} from '../model/model';
import * as Public from './public-net';
import * as Private from './private-net';
import {generateNodeServiceUrls, generateNodeVirtualChainUrls, updateNodeServiceUrlsWithVersion} from './url-generator';
import {Monitors} from '../monitors/main';
import {FailedAttemptsTracker} from './fail_tracker';

const NumberOfPingTries = 10;
const DefaultPingTimeout = 5000;
const MinErrorsForCriticalAlert = 6;
export const tracker = new FailedAttemptsTracker();

export class Processor {
  private model = new Model();
  private monitors: Monitors;
  private slowPart : number = 0;
  private fastPart : number = 0;

  constructor(private config: Configuration) {
    this.monitors = new Monitors(this.config);
  }

  getModel(): Model {
    return this.model;
  }

  finishedAtLeastOnce(): boolean {
    return this.slowPart > 0 && this.fastPart > 0;
  }
  
  async runFrequent() {
    if (this.slowPart == 0) {
      return;
    }

    const start = Date.now();
    Logger.log('Processor: starting frequent flyer.');

    this.fillInAllRegistered(this.model.AllRegisteredNodes, this.model.CommitteeNodes, this.model.StandByNodes, this.model.VirtualChains, this.model.Services);

    // read all the different url-generated data
    const tasks: Promise<any>[] = [];
    tasks.push(...this.readNodesVirtualChains(this.model.CommitteeNodes, this.model.VirtualChains));
    tasks.push(...this.readNodesVirtualChains(this.model.StandByNodes, this.model.VirtualChains));
    tasks.push(...this.readNodesServices(this.model.CommitteeNodes, this.model.Services));
    tasks.push(...this.readNodesServices(this.model.StandByNodes, this.model.Services));
    tasks.push(...this.readNodesServices(this.model.AllRegisteredNodes, this.model.Services));
    await Promise.all(tasks);
    this.updateVCsColors(this.model.CommitteeNodes);
    this.updateVCsColors(this.model.StandByNodes);

    if (this.shouldSetCriticalAlert(this.model.AllRegisteredNodes)) this.model.CriticalAlert = true;
    this.model.Statuses[StatusName.PingUrls] = await this.pingUrls();
    this.model.Statuses[StatusName.Certs] = await this.certificateChecks();
    Logger.log('Processor: finished query all nodes/vcs/services/urls.');
    // monitoring
    await this.monitors.run(this.model, this.model);
    const end = Date.now();

    Logger.log(`Processor: frequent flyer, took: ${end - start} ms`);

    this.fastPart++;
  }

  // single tick of the run loop
  async run() {
    try {
      Logger.log('Processor: waking up do refresh model.');

      if (this.config.NetworkType === NetworkType.Public) {
        await Public.updateModel(this.model, this.config);
      } else {
        await Private.updateModel(this.model, this.config);
      }
      Logger.log('Processor: finished discovering nodes to query.');

      this.slowPart++;
    } catch (e) {
      console.log (e);
      Logger.error(`Failed to update model, error: ${e}. Skipping ... `);
    }
  }

  /*
   * Functions that are for all network types
   */
  private readNodesVirtualChains(nodes: Guardians, virtualChains: VirtualChain[]) {
    const tasks: Promise<any>[] = [];
    _.map(nodes, node => {
      _.forEach(virtualChains, vc => {
        tasks.push(
          this.readNodeVirtualChain(node, vc).then(result => {
            node.NodeVirtualChains[vc.Id] = result;
          })
        );
      });
    });
    return tasks;
  }

  private async readNodeVirtualChain(node: Guardian, vc: VirtualChain) {
    const urls = generateNodeVirtualChainUrls(node.Ip, vc.Id);
    try {
      const vcStatusData = await fetchJson(urls.Status);

      const versionTag = vcStatusData.Payload?.Version?.Semantic || '';
      updateNodeServiceUrlsWithVersion(urls, Service.VC.RepositoryPrefix, versionTag);

      const errMsg = vcStatusData?.Error || '';
      const timestamp = vcStatusData.Timestamp || '';
      const { healthLevel, healthLevelToolTip } = this.healthLevel(errMsg, "", timestamp);

      const inOrderBlockHeight = vcStatusData.Payload?.BlockStorage?.InOrderBlock?.BlockHeight || 0;
      const topBlockHeight = vcStatusData.Payload?.BlockStorage?.TopBlock?.BlockHeight || 0; //
      const blockToolTip = topBlockHeight === inOrderBlockHeight ? '' : `Synchronizing to reach ${topBlockHeight}`;

      return nodeVirtualChainBuilder(
        urls,
        vcStatusData.Status || '',
        healthLevel,
        healthLevelToolTip,
        timestamp,
        versionTag,
        inOrderBlockHeight,
        blockToolTip,
        vcStatusData.Payload?.Management?.Protocol?.Current || 0
      );
    } catch (err) {
      Logger.error(`Error while attempting to fetch status of Node Virtual Chain ${vc.Id} of ${node.Name}(${node.Ip}): ${err}`);
      return nodeVirtualChainBuilder(
        urls,
        //`HTTP gateway for node may be down`,
        `offline`,
        HealthLevel.Yellow,
        //`HTTP gateway for node may be down, status endpoint does not respond`
        `offline`
      );
    }
  }

  private readNodesServices(nodes: Guardians, services: Service[]) {
    const tasks: Promise<any>[] = [];
    _.map(nodes, node => {
      _.forEach(services, service => {
        tasks.push(
          this.readNodeService(node, service).then(result => {
            node.NodeServices[service.Name] = result;
          })
        );
      });
    });
    return tasks;
  }
  ///////////////////////////////
  highMemMsg = `Memory usage is higher`;
  memPercThreshold = 98;
  private filterIgnoredServiceErrors(svcName: string, errMsg: string): string {
    const boyarErrs = [
      /^\s*CPU usage is higher (that|than) [0-9]+% \(currently at [0-9]+.?[0-9]*%\)\s*$/
    ];
    if (svcName === 'Boyar') {
      for (const rx of boyarErrs) {
        if (rx.test(errMsg)) {
          return '';
        }
      }
      // PATCH (yuval) to ignore memory usage > 75 but < 99 (dockerd)
      if ( errMsg.startsWith(this.highMemMsg)){
        // extract decimal
        const res = /(\d+.\d+)/g.exec(errMsg);
        if(res && res.length > 1 ){
          const perc = parseFloat(res[1]);
          if(perc && perc < this.memPercThreshold){
            return '';
          }
        }
      }
    }
    return errMsg;
  }

  private async readNodeService(node: Guardian, service: Service) {
    const urls = generateNodeServiceUrls(node.Ip, service);
    try {
      const data = await fetchJson(urls.Status);
      const versionTag = data.Payload?.Version?.Semantic || '';
      updateNodeServiceUrlsWithVersion(urls, service.RepositoryPrefix, versionTag);

      const errMsg = this.filterIgnoredServiceErrors(service.Name, data?.Error) || '';
      const timestamp = data.Timestamp || '';
      const { healthLevel, healthLevelToolTip } = this.healthLevel(errMsg, data?.Extra, timestamp);

      return nodeServiceBuilder(
          urls,
          data.Status || '',
          healthLevel,
          healthLevelToolTip,
          timestamp,
          versionTag,
          data.StatusSpec,
          service.Name.startsWith("vm-") ? data : undefined
      );

    } catch (err) {
      Logger.error(`Error while attempting to fetch status of Node Service ${service.Name} of ${node.Name}(${node.Ip}): ${err}`);

      if ((err.message.includes("404") && service.Name === "Controller")) {
        // Check if the sibling Boyar is yellow, make this one yellow as well so the whole node is yellow.
        if (node.NodeServices["Boyar"]?.StatusMsg === "N/A") {
            console.log (`Controller is down, but Boyar is yellow. Setting Controller to yellow as well , for node ${node.Name} (${node.Ip})`);

            return nodeServiceBuilder(urls,`N/A`,HealthLevel.Yellow,`N/A`);
        }

        return nodeServiceBuilder(urls,`N/A`,HealthLevel.Green,`N/A`);
      }

      if ((err.message.includes("404") && service.Name === "Boyar")) {
        // Check if the sibling Controller is green, make this one green as well since it's a new node which has a controller instead of boyar.
        if (node.NodeServices["Controller"]?.StatusMsg === "N/A") {
            console.log (`Controller is green, setting Boyar to green as well for node ${node.Name} (${node.Ip})`);

            return nodeServiceBuilder(urls,`N/A`,HealthLevel.Yellow,`N/A`);
        } else {
            return nodeServiceBuilder(urls,`N/A`,HealthLevel.Green,`N/A`);
        }

         return nodeServiceBuilder(urls,`N/A`,HealthLevel.Yellow,`N/A`);
      }

      return nodeServiceBuilder(
        urls,
        //`HTTP gateway for service may be down`,
        `offline`,
        HealthLevel.Yellow,
        //`HTTP gateway for service may be down, status endpoint does not respond`
        `offline`
      );
    }
  }

  private fillInAllRegistered(all: Guardians, committee: Guardians, standbys: Guardians, virtualChains: VirtualChain[], services: Service[]) {
    _.forOwn(all, g => {
      if (_.has(committee, g.EthAddress)) {
        const member = committee[g.EthAddress];
        _.forEach(virtualChains, vc => (g.NodeVirtualChains[vc.Id] = nodeVirtualChainCopy(member.NodeVirtualChains[vc.Id])));
        _.forEach(services, service => (g.NodeServices[service.Name] = nodeServiceCopy(member.NodeServices[service.Name])));
      } else if (_.has(standbys, g.EthAddress)) {
        const standby = standbys[g.EthAddress];
        _.forEach(virtualChains, vc => (g.NodeVirtualChains[vc.Id] = nodeVirtualChainCopy(standby.NodeVirtualChains[vc.Id])));
        _.forEach(services, service => (g.NodeServices[service.Name] = nodeServiceCopy(standby.NodeServices[service.Name])));
      } else {
        _.forEach(
          virtualChains,
          vc => (g.NodeVirtualChains[vc.Id] = nodeVirtualChainBuilder(generateNodeVirtualChainUrls(g.Ip, vc.Id), 'Unknown', HealthLevel.Gray))
        );
        _.forEach(
          services,
          service => (g.NodeServices[service.Name] = nodeServiceBuilder(generateNodeServiceUrls(g.Ip, service), 'Unknown', HealthLevel.Gray))
        );
      }
    });
  }

  private healthLevel(errMsg: string, extra : string,  timestamp: string) {
    const ignoredErrors = ['signAndSendTransaction didnt complete', 'Cannot read properties of undefined'] // ignore some Keepers errors
    let healthLevel = HealthLevel.Green;
    let healthLevelToolTip = '';

    if (extra!=undefined && extra.indexOf('updating')>-1) {
      healthLevel = HealthLevel.Blue;
      const obj = JSON.parse(extra);
      healthLevelToolTip = obj.time;

      return { healthLevel, healthLevelToolTip };
    }

    if (errMsg !== '' && !ignoredErrors.some(e => errMsg.includes(e))) {
      healthLevel = HealthLevel.Yellow;
      healthLevelToolTip = errMsg;
    } else if (timestamp === '') {
      healthLevel = HealthLevel.Yellow;
      healthLevelToolTip = 'Missing timestamp field. Information may be stale information.';
    } else if (isStaleTime(timestamp, this.config.StaleStatusTimeSeconds)) {
      healthLevel = HealthLevel.Yellow;
      healthLevelToolTip = `Information is stale, was updated ${timeAgoText(timestamp)}`;
    }
    return { healthLevel, healthLevelToolTip };
  }

  public async pingUrls(): Promise<GenStatus> {
    const txs: Promise<any>[] = [];
    for (let i = 0; i < this.config.PingUrlEndpoints.length; i++) {
      const threshhold = this.config.PingUrlTimeoutsMillis.length > 0 ? this.config.PingUrlTimeoutsMillis[i] : DefaultPingTimeout;
      txs.push(pingOneUrl(this.config.PingUrlEndpoints[i], threshhold));
    }
    const res = await Promise.all(txs);
    const healthMessages: string[] = _.map(
      _.pickBy(res, r => r !== ''),
      r => r
    );

    if (healthMessages.length > 0) {    
      return {
        Status: HealthLevel.Yellow,
        StatusMsg: `${healthMessages.length} of ${this.config.PingUrlEndpoints.length} monitored URLs failed to respond on time.`,
        StatusToolTip: healthMessages.join('\n')
      };
    }
    return {
      Status: HealthLevel.Green,
      StatusMsg: 'All monitored URLs responded OK',
      StatusToolTip: 'OK'
    };
  }

  public async certificateChecks(): Promise<GenStatus> {
    const healthMessages: string[] = [];
    const certChecks = await Promise.all(this.config.SslHosts.map(host => sslChecker(host, { method: 'GET', port: 443 })));
    for (let i = 0; i < this.config.SslHosts.length; i++) {
      if (!certChecks[i].valid) {
        healthMessages.push(`Host ${this.config.SslHosts[i]} certificate is not valid.`);
      } else if (typeof certChecks[i].daysRemaining === 'number' && certChecks[i].daysRemaining < 8) {
        healthMessages.push(`Host ${this.config.SslHosts[i]} certificate will expire in ${certChecks[i].daysRemaining} days.`);
      }
    }

    if (healthMessages.length > 0) {
      return {
        Status: HealthLevel.Yellow,
        StatusMsg: `${healthMessages.length} of ${this.config.SslHosts.length} monitored certificate checks failed.`,
        StatusToolTip: healthMessages.join('\n')
      };
    }
    return {
      Status: HealthLevel.Green,
      StatusMsg: 'All monitored certificates are OK',
      StatusToolTip: 'OK'
    };
  }

  public shouldSetCriticalAlert(guardians: Guardians) {
    let countErrors = 0;
    try {
      for (const memberData of Object.values(guardians)) {
        countErrors += Number(
          _.filter(memberData.NodeVirtualChains, nodeVirtualChain => nodeVirtualChain.Status === HealthLevel.Yellow).length +
            _.filter(memberData.NodeServices, nodeService => nodeService.Status === HealthLevel.Yellow).length +
            Number(memberData.NodeReputation.ReputationStatus === HealthLevel.Yellow) >
            0
        );

        if (countErrors >= MinErrorsForCriticalAlert) return true;
      }
    } catch (err) {
      console.log(`failed to update critical alert`);
      return true;
    }

    return false;
  }

  public updateVCsColors(guardians: Guardians) {
    try {
      for (const memberData of Object.values(guardians)) {
        if (
          _.filter(memberData.NodeVirtualChains, nodeVirtualChain => [HealthLevel.Yellow, HealthLevel.Red].includes(nodeVirtualChain.Status)).length ===
            Object.keys(memberData.NodeVirtualChains).length &&
          [HealthLevel.Yellow, HealthLevel.Red].includes(memberData.NodeServices.Management.Status)
        ) {
          for (const nodeVC of Object.values(memberData.NodeVirtualChains)) {
            nodeVC.Status = HealthLevel.Green;
            nodeVC.StatusMsg = '';
            nodeVC.StatusToolTip = '';
          }
        }
      }
    } catch (err) {
      console.log(`failed to update virtual chains colors`);
    }
  }
}

async function pingOneUrl(url: string, threshhold: number): Promise<string> {
  let numErrs = 0;
  for (let j = 0; j < NumberOfPingTries; j++) {
    try {
      const response = await fetch(url, { timeout: threshhold });
      if (!response.ok) {
        numErrs++;
      }
    } catch {
      numErrs++;
    }
  }
  //if (numErrs !== 0) {
  if(NumberOfPingTries && numErrs / NumberOfPingTries > 0.4){    
    return `URL '${url}' failed to respond ${numErrs} out of ${NumberOfPingTries} times (timeout set at ${threshhold})`;
  }
  return '';
}
