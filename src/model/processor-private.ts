import _ from 'lodash';
import { Configuration } from '../config';
import { fetchJson, getCurrentClockTime } from '../helpers';
import { Model, VirtualChain, Service, Guardians, HealthLevel } from './model';
import * as URLs from './url-generator';
import * as Logger from '../logger';

// Important URLS for private-network - init explore of network from these.
const NodeManagementSuffix = ':7666/node/management';

export async function updateModel(model: Model, config: Configuration) {
  const rootNodeData = await fetchJson(`${config.RootNodeEndpoint}${NodeManagementSuffix}`);

  const virtualChainList = readVirtualChains(rootNodeData);
  if (_.size(virtualChainList) === 0 ) {
    Logger.error(`Could not read valid Virtual Chains, current network seems not to be running any.`);
  }

  const services = [
    // choose the services that exist in a private network
    Service.Boyar,
    Service.Signer,
  ];

  const vcMgmtData = await fetchJson(`${config.RootNodeEndpoint}/${Service.VC.ServiceUrlName}/${virtualChainList[0].Id}${URLs.StatusSuffix}`);
  const guardaisn = _.keyBy(readGuardians(vcMgmtData), (o) => o.EthAddress);

  model.TimeSeconds = getCurrentClockTime();
  model.Timestamp = new Date().toISOString();
  model.VirtualChains = virtualChainList;
  model.Services = services;
  model.CommitteeNodes = guardaisn;
  model.StandByNodes = {};
}

function readVirtualChains(rootNodeData: any): VirtualChain[] {
  return _.map(rootNodeData.chains, (vcData) => {
    return {
      Id: vcData.Id,
      Name: _.isString(vcData.Name) ? vcData.Name : '',
      IsCanary: _.isString(vcData.RolloutGroup) ? vcData.RolloutGroup != 'main' : false,
      IsCertified: _.isNumber(vcData.IdentityType) ? vcData.IdentityType === 1 : false,
      GenesisTimeSeconds: 0,
      ExpirationTimeSeconds: -1,
      SubscriptionStatus: HealthLevel.Green,
      SubscriptionStatusToolTip: '',
      VirtualChainUrls: URLs.generateVirtualChainUrls(vcData.Id),
    };
  });
}

function readGuardians(mgmtData: any): Guardians {
  const topology = mgmtData.Payload.Management?.Topology || {};
  if (_.size(topology) === 0 ) {
      Logger.error(`Could not read a valid Topology, current network seems empty.`);
  }
  return _.mapValues(topology, (guardianData) => {
    let ip = _.isString(guardianData.Endpoint) ? guardianData.Endpoint : '';
    return {
      EthAddress: guardianData.Address,
      Name: _.isString(guardianData.Name) ? guardianData.Name : '',
      Ip: ip,
      Website: '',
      EffectiveStake: 1,
      IsCertified: false,
      OrbsAddress: guardianData.Address,
      NodeManagementURL: URLs.generateNodeManagmentUrl(ip),
      NodeVirtualChains: {},
      NodeServices: {},
      NodeReputation: {
        NodeVirtualChainReputations: {},
        NodeVirtualChainBadReputations: {},
        ReputationStatus: HealthLevel.Green,
        ReputationToolTip: '',
      },
    };
  });
}
