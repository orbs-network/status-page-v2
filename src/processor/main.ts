/**
 * Copyright 2020 the orbs-network/status-page-v2 authors
 * This file is part of the orbs-network/status-page-v2 library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import _ from 'lodash';
import { Configuration, NetworkType } from '../config';
import { fetchJson, isStaleTime, timeAgoText } from '../helpers';
import * as Logger from '../logger';
import { Model, VirtualChain, Service, Guardians, Guardian, HealthLevel, nodeServiceBuilder, nodeVirtualChainBuilder } from '../model/model';
import * as Public from './public-net';
import * as Private from './private-net';
import { generateNodeVirtualChainUrls, generateNodeServiceUrls, updateNodeServiceUrlsWithVersion } from './url-generator';
import { Monitors } from '../monitors/main';

export class Processor {
  private model = new Model();
  private monitors: Monitors;

  constructor(private config: Configuration) {
    this.monitors = new Monitors(this.config);
  }

  getModel(): Model {
    return this.model;
  }

  // single tick of the run loop
  async run() {
    try {
      Logger.log('Processor: waking up do refresh model.');

      const newModel = new Model();
      if (this.config.NetworkType === NetworkType.Public) {
        await Public.updateModel(newModel, this.config);
      } else {
        await Private.updateModel(newModel, this.config);
      }
      Logger.log('Processor: finished discovering nodes to query.');

      // read all the different url-generated datas
      const tasks: Promise<any>[] = [];
      tasks.push(...this.readNodesVirtualChains(newModel.CommitteeNodes, newModel.VirtualChains));
      tasks.push(...this.readNodesVirtualChains(newModel.StandByNodes, newModel.VirtualChains));
      tasks.push(...this.readNodesServices(newModel.CommitteeNodes, newModel.Services));
      tasks.push(...this.readNodesServices(newModel.StandByNodes, newModel.Services));
      await Promise.all(tasks);
      this.generateOnlyUrls(newModel.AllRegisteredNodes, newModel.VirtualChains, newModel.Services);
      Logger.log('Processor: finished query all nodes/vcs/services.');

      // monitoring
      this.monitors.run(this.model, newModel);
      Logger.log('Processor: finished monitoring.');

      // update model
      this.model = newModel;
    } catch (e) {
      Logger.error(`Failed to update model, error: ${e}. Skipping ... `);
    }
  }

  /*
   * Functions that are for all network types
   */
  private readNodesVirtualChains(nodes: Guardians, virtualChains: VirtualChain[]) {
    const tasks: Promise<any>[] = [];
    _.map(nodes, (node) => {
      _.forEach(virtualChains, (vc) => {
        tasks.push(
          this.readNodeVirtualChain(node, vc).then((result) => {
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
      const { healthLevel, healthLevelToolTip } = this.healthLevel(errMsg, timestamp);

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
        vcStatusData.Payload?.Management?.Protocol?.Current || 0,
      );
    } catch (err) {
      Logger.error(`Error while attemtping to fetch status of Node Virtual Chain ${vc.Id} of ${node.Name}(${node.Ip}): ${err}`);
      return nodeVirtualChainBuilder(urls, `HTTP gateway for node may be down`, HealthLevel.Red, `HTTP gateway for node may be down, status endpoint does not respond`);
    }
  }

  private readNodesServices(nodes: Guardians, services: Service[]) {
    const tasks: Promise<any>[] = [];
    _.map(nodes, (node) => {
      _.forEach(services, (service) => {
        tasks.push(
          this.readNodeService(node, service).then((result) => {
            node.NodeServices[service.Name] = result;
          })
        );
      });
    });
    return tasks;
  }

  private async readNodeService(node: Guardian, service: Service) {
    const urls = generateNodeServiceUrls(node.Ip, service);
    try {
      const data = await fetchJson(urls.Status);

      const versionTag = data.Payload?.Version?.Semantic || '';
      updateNodeServiceUrlsWithVersion(urls, service.RepositoryPrefix, versionTag);

      const errMsg = data?.Error || '';
      const timestamp = data.Timestamp || '';
      const { healthLevel, healthLevelToolTip } = this.healthLevel(errMsg, timestamp);

      return nodeServiceBuilder(
        urls,
        data.Status || '',
        healthLevel,
        healthLevelToolTip,
        timestamp,
        versionTag,
      );
    } catch (err) {
      Logger.error(`Error while attemtping to fetch status of Node Service ${service.Name} of ${node.Name}(${node.Ip}): ${err}`);
      return nodeServiceBuilder(urls, `HTTP gateway for service may be down`, HealthLevel.Red, `HTTP gateway for service may be down, status endpoint does not respond`);
    }
  }

  private generateOnlyUrls(guardians: Guardians, virtualChains: VirtualChain[], services: Service[]){ 
    _.forOwn(guardians, g => {
      _.forEach(virtualChains, vc => g.NodeVirtualChains[vc.Id] = nodeVirtualChainBuilder(generateNodeVirtualChainUrls(g.Ip, vc.Id), 'Unknown', HealthLevel.Gray));
      _.forEach(services, service => g.NodeServices[service.Name] = nodeServiceBuilder(generateNodeServiceUrls(g.Ip, service), 'Unknown', HealthLevel.Gray));
    });
  }

  private healthLevel(errMsg: string, timestamp: string) {
    let healthLevel = HealthLevel.Green;
    let healthLevelToolTip = '';
    if (errMsg !== '') {
      healthLevel = HealthLevel.Red;
      healthLevelToolTip = errMsg;
    } else if (timestamp === '') {
      healthLevel = HealthLevel.Red;
      healthLevelToolTip = 'Missing timestamp field. Information may be stale information.';
    }
    else if (isStaleTime(timestamp, this.config.StaleStatusTimeSeconds)) {
      healthLevel = HealthLevel.Red;
      healthLevelToolTip = `Information is stale, was updated ${timeAgoText(timestamp)}`;
    }
    return { healthLevel, healthLevelToolTip };
  }
}
