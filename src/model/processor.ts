import _ from 'lodash';
import { Configuration, NetworkType } from '../config';
import { fetchJson, isStaleTime, timeAgoText } from '../helpers';
import * as Logger from '../logger';
import { Model, VirtualChain, Service, Guardians, Guardian, HealthLevel, nodeServiceBuilder, nodeVirtualChainBuilder } from './model';
import * as Public from './processor-public';
import * as Private from './processor-private';
import { generateNodeVirtualChainUrls, generateNodeServiceUrls, updateNodeServiceUrlsWithVersion } from './url-generator';

export class Processor {
  private model = new Model();

  constructor(private config: Configuration) {}

  getModel(): Model {
    return this.model;
  }

  // single tick of the run loop
  async run() {
    try {
      Logger.log('Processor: waking up do refresh model.');

      let newModel = new Model();
      if (this.config.NetworkType === NetworkType.Public) {
        await Public.updateModel(newModel, this.config);
      } else {
        await Private.updateModel(newModel, this.config);
      }

      // read all the different url-generated datas
      let tasks: Promise<any>[] = [];
      tasks.push(...this.readNodesVirtualChains(newModel.CommitteeNodes, newModel.VirtualChains));
      tasks.push(...this.readNodesVirtualChains(newModel.StandByNodes, newModel.VirtualChains));
      tasks.push(...this.readNodesServices(newModel.CommitteeNodes, newModel.Services));
      tasks.push(...this.readNodesServices(newModel.StandByNodes, newModel.Services));
      await Promise.all(tasks);

      this.model = newModel;
    } catch (e) {
      Logger.error(`Failed to update model, error: ${e}. Skipping ... `);
    }
  }

  /*
   * Functions that are for all network types
   */
  private readNodesVirtualChains(nodes: Guardians, virtualChains: VirtualChain[]) {
    let tasks: Promise<any>[] = [];
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
      let { healthLevel, healthLevelToolTip } = this.healthLevel(errMsg, timestamp);

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
      Logger.error(`Error while attemtping to fetch status of Node Virtual Chain ${node.Name}(${node.Ip}): ${err}`);
      return nodeVirtualChainBuilder(urls, `HTTP gateway for node may be down`, HealthLevel.Red, `HTTP gateway for node may be down, status endpoint does not respond`);
    }
  }

  private readNodesServices(nodes: Guardians, services: Service[]) {
    let tasks: Promise<any>[] = [];
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
      let { healthLevel, healthLevelToolTip } = this.healthLevel(errMsg, timestamp);

      return nodeServiceBuilder(
        urls,
        data.Status || '',
        healthLevel,
        healthLevelToolTip,
        timestamp,
        versionTag,
      );
    } catch (err) {
      Logger.error(`Error while attemtping to fetch status of Node Service ${service.Name}: ${err}`);
      return nodeServiceBuilder(urls, `HTTP gateway for service may be down`, HealthLevel.Red, `HTTP gateway for service may be down, status endpoint does not respond`);
    }
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
