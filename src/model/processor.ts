import _ from 'lodash';
import { Configuration, NetworkType } from '../config';
import { fetchJson, isStaleTime } from '../helpers';
import * as Logger from '../logger';
import { Model, VirtualChain, Service, Guardians, Guardian, HealthLevel } from './model';
import * as Public from './processor-public';
import {
  generateNodeVirtualChainUrls,
  generateNodeServiceUrls,
  updateNodeServiceUrlsWithVersion,
} from './url-generator';

export class Processor {
  private model = new Model();

  constructor(private config: Configuration) {}

  getModel(): Model {
    return this.model;
  }

  // single tick of the run loop
  async run() {
    Logger.log('Processor: waking up do refresh model.');

    let newModel = new Model();
    if (this.config.NetworkType === NetworkType.Public) {
      await Public.updateModel(newModel, this.config);
    } else {
      // TODO private
    }

    // read all the different url-generated datas
    let tasks: any[] = [];
    tasks.push(this.readNodesVirtualChains(newModel.CommitteeNodes, newModel.VirtualChains));
    tasks.push(this.readNodesVirtualChains(newModel.StandByNodes, newModel.VirtualChains));
    tasks.push(this.readNodesServices(newModel.CommitteeNodes, newModel.Services));
    tasks.push(this.readNodesServices(newModel.StandByNodes, newModel.Services));
    await Promise.all(tasks);

    this.model = newModel;
  }

  /*
   * Functions that are for all network types
   */
  private readNodesVirtualChains(nodes: Guardians, virtualChains: VirtualChain[]) {
    let tasks: any[] = [];
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
    const vcStatusData = await fetchJson(urls.Status);

    const versionTag = vcStatusData.Payload['Version.Semantic'].Value || ''; //vcStatusData.Payload?.Version?.Semantic
    updateNodeServiceUrlsWithVersion(urls, Service.VC.RepositoryPrefix, versionTag);

    const errMsg = vcStatusData?.Error || '';
    const timestamp = vcStatusData.Timestamp || '';
    let healthLevel = HealthLevel.Green;
    let healthLevelToolTip = '';
    if (errMsg !== '') {
      healthLevel = HealthLevel.Red;
      healthLevelToolTip = errMsg;
    } else if (isStaleTime(timestamp, this.config.StaleStatusTimeSeconds)) {
      healthLevel = HealthLevel.Yellow;
      healthLevelToolTip = `Information is stale, was update on ${timestamp}`;
    }

    const inOrderBlockHeight = vcStatusData.Payload['BlockStorage.BlockHeight'].Value || 0; //vcStatusData.Payload?.BlockStorage?.InOrderBlock?.BlockHeight
    const topBlockHeight = vcStatusData.Payload['BlockStorage.BlockHeight'].Value || 0; //vcStatusData.Payload?.BlockStorage?.TopBlock?.BlockHeight
    const blockToolTip = topBlockHeight === inOrderBlockHeight ? '' : `Synchronizing to reach ${topBlockHeight}`;

    return {
      BlockHeight: inOrderBlockHeight,
      BlockHeightToolTip: blockToolTip,
      Version: versionTag,
      Commit: vcStatusData.Payload['Version.Commit'].Value || '', //vcStatusData.Payload?.Version?.Commit
      ProtocolVersion: vcStatusData.Payload['Management.Protocol.Current'].Value || 0, //vcStatusData.Payload?.Management?.Protocol?.Current
      StatusMsg: vcStatusData.Status || '',
      ErrorMsg: errMsg,
      Timestamp: timestamp,
      Status: healthLevel,
      StatusToolTip: healthLevelToolTip,
      URLs: urls,
    };
  }

  private readNodesServices(nodes: Guardians, services: Service[]) {
    let tasks: any[] = [];
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
    const data = await fetchJson(urls.Status);

    const versionTag = data.Payload?.Version?.Semantic || '';
    updateNodeServiceUrlsWithVersion(urls, service.RepositoryPrefix, versionTag);

    const errMsg = data?.Error || '';
    const timestamp = data.Timestamp || '';
    let healthLevel = HealthLevel.Green;
    let healthLevelToolTip = '';
    if (errMsg !== '') {
      healthLevel = HealthLevel.Red;
      healthLevelToolTip = errMsg;
    } else if (isStaleTime(timestamp, this.config.StaleStatusTimeSeconds)) {
      healthLevel = HealthLevel.Yellow;
      healthLevelToolTip = `Information is stale, was update on ${timestamp}`;
    }
    return {
      Version: versionTag,
      Commit: data.Payload?.Version?.Commit || '',
      StatusMsg: data.Status || '',
      ErrorMsg: errMsg,
      Timestamp: timestamp,
      Status: healthLevel,
      StatusToolTip: healthLevelToolTip,
      URLs: urls,
    };
  }
}
