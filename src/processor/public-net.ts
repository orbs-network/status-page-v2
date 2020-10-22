/**
 * Copyright 2020 the orbs-network/status-page-v2 authors
 * This file is part of the orbs-network/status-page-v2 library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import _ from 'lodash';
import * as Logger from '../logger';
import { Configuration } from '../config';
import { fetchJson, isStaleTime, getCurrentClockTime, timeAgoText } from '../helpers';
import { Model, VirtualChain, Service, Guardians, HealthLevel, Guardian } from '../model/model';
import { generateErrorEthereumStatus, getEthereumStatus } from './ethereum';
import * as URLs from './url-generator';

// Important URLS for public-network - init explore of network from these.
const ManagementStatusSuffix = '/services/management-service/status';
const EthWriterStatusSuffix = '/services/ethereum-writer/status';
const Protocol = 'http://';

export async function updateModel(model: Model, config: Configuration) {
  const rootNodeEndpoints = config.RootNodeEndpoints;
  for(const rootNodeEndpoint of rootNodeEndpoints) {
      try {
          return await readData(model, rootNodeEndpoint, config);
      } catch (e) {
          Logger.log(`Warning: access to Node ${rootNodeEndpoint} failed, trying another. Error: ${e}`)
      }
  }

  throw new Error(`Error while creating Status Page, all Netowrk Nodes failed to respond.`)
}

async function readData(model: Model, rootNodeEndpoint: string, config: Configuration) {
  const rootNodeData = await fetchJson(`${Protocol}${rootNodeEndpoint}${ManagementStatusSuffix}`);

  const virtualChainList = readVirtualChains(rootNodeData, config);
  if (_.size(virtualChainList) === 0 ) {
    Logger.error(`Could not read valid Virtual Chains, current network seems not to be running any.`);
  }

  const services = [
    // choose the services that exist in a public network
    Service.Boyar,
    Service.Signer,
    Service.Logger,
    Service.Management,
    Service.EthereumWriter,
  ];

  let committeeMembers = {};
  let standByMembers = {};

  const guardians = readGuardians(rootNodeData);
  // check in sync mode (stale ref) - remove guardians that are not me.
  const currentRefTime = rootNodeData.Payload?.CurrentRefTime || 0;
  if (isStaleTime(currentRefTime, config.StaleStatusTimeSeconds*4 /*1 hour*/)) {
    committeeMembers = _.pickBy(guardians, (g) => g.Ip === rootNodeEndpoint);
    Logger.log(`Network information is from ${currentRefTime > 0 ? timeAgoText(currentRefTime): 'unknown time'}. Service might be syncing.`);
  } else {  
    const committeeMembersAddresses = _.map(rootNodeData.Payload.CurrentCommittee, 'EthAddress');
    committeeMembers = _.pick(guardians, committeeMembersAddresses);
    if (_.size(committeeMembers) === 0 ) {
      Logger.error(`Could not read a valid Committee, current network seems empty.`);
    }
    const standbyMembersAddresses = _.map(_.filter(rootNodeData.Payload.CurrentCandidates, (data) => data.IsStandby), 'EthAddress');
    standByMembers = _.pick(guardians, standbyMembersAddresses);

    try {
      calcReputation(`${Protocol}${rootNodeEndpoint}${EthWriterStatusSuffix}`, committeeMembers);
    } catch (e) {
      Logger.error(`Error while attemtping to fetch ethereum reputation data. skipping: ${e}`);
    }
  }

  if (config.EthereumEndpoint && config.EthereumEndpoint !== '') {
    try {
      model.EthereumStatus = await getEthereumStatus(config);
    } catch (e) {
      model.EthereumStatus = generateErrorEthereumStatus(`Error while attemtping to fetch ethereum status data: ${e}`);
      Logger.error(model.EthereumStatus.StatusToolTip);
    }
  }

  model.TimeSeconds = getCurrentClockTime();
  model.Timestamp = new Date().toISOString();
  model.VirtualChains = virtualChainList;
  model.Services = services;
  model.CommitteeNodes = committeeMembers;
  model.StandByNodes = standByMembers;
  model.AllRegisteredNodes = _.mapValues(guardians, g => {return copyGuardian(g)});
}

function readVirtualChains(rootNodeData: any, config: Configuration): VirtualChain[] {
  return _.map(rootNodeData.Payload.CurrentVirtualChains, (vcData, vcId) => {
    const expirationTime = _.isNumber(vcData.Expiration) ? vcData.Expiration : -1;
    let healthLevel = HealthLevel.Green;
    let healthLevelToolTip = '';
    if (expirationTime > 0) {
      if (getCurrentClockTime() > expirationTime - config.ExpirationWarningTimeInDays * 24 * 60 * 60) {
        healthLevel = HealthLevel.Yellow;
        healthLevelToolTip = `VirtualChain will expire in less than ${config.ExpirationWarningTimeInDays} days.`;
      } else if (isStaleTime(expirationTime, 0)) {
        healthLevel = HealthLevel.Red;
        healthLevelToolTip = 'VirtualChain expired.';
      }
    }
    return {
      Id: vcId,
      Name: _.isString(vcData.Name) ? vcData.Name : '',
      IsCanary: _.isString(vcData.RolloutGroup) ? vcData.RolloutGroup != 'main' : false,
      IsCertified: _.isNumber(vcData.IdentityType) ? vcData.IdentityType === 1 : false,
      GenesisTimeSeconds: _.isNumber(vcData.GenesisRefTime) ? vcData.GenesisRefTime : 0,
      ExpirationTimeSeconds: expirationTime,
      SubscriptionStatus: healthLevel,
      SubscriptionStatusToolTip: healthLevelToolTip,
      VirtualChainUrls: URLs.generateVirtualChainUrls(vcId),
    };
  });
}

function readGuardians(rootNodeData: any): Guardians {
  return _.mapValues(rootNodeData.Payload.Guardians, (guardianData) => {
    const ip = _.isString(guardianData.Ip) ? guardianData.Ip : '';
    return {
      EthAddress: guardianData.EthAddress,
      Name: _.isString(guardianData.Name) ? guardianData.Name : '',
      Ip: ip,
      Website: _.isString(guardianData.Website) ? guardianData.Website : '',
      EffectiveStake: _.isNumber(guardianData.EffectiveStake) ? guardianData.EffectiveStake : 0,
      IsCertified: _.isNumber(guardianData.IdentityType) ? guardianData.IdentityType === 1 : false,
      OrbsAddress: _.isString(guardianData.OrbsAddress) ? guardianData.OrbsAddress : '',
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

function copyGuardian(guardianData: Guardian): Guardian {
  return {
    EthAddress: guardianData.EthAddress,
    Name: guardianData.Name ,
    Ip: guardianData.Ip,
    Website: guardianData.Website,
    EffectiveStake: guardianData.EffectiveStake,
    IsCertified: guardianData.IsCertified,
    OrbsAddress: guardianData.OrbsAddress,
    NodeManagementURL: URLs.generateNodeManagmentUrl(guardianData.Ip),
    NodeVirtualChains: {},
    NodeServices: {},
    NodeReputation: {
      NodeVirtualChainReputations: {},
      NodeVirtualChainBadReputations: {},
      ReputationStatus: HealthLevel.Green,
      ReputationToolTip: '',
    },
  };
}

async function calcReputation(url: string, committeeMembers: Guardians) {
  const data = await fetchJson(url);

  const orbsToEthAddr: { [key: string]: string } = {};
  _.map(committeeMembers, (node) => {
    orbsToEthAddr[node.OrbsAddress] = node.EthAddress;
  });

  const allReputation = data.Payload?.VchainReputations || {};
  _.map(allReputation, (vc, vcId: string) => {
    _.map(vc, (reputation: number, orbsAddress: string) => {
      if (_.has(orbsToEthAddr, orbsAddress)) {
        const nodeId = orbsToEthAddr[orbsAddress];
        if (_.has(committeeMembers, nodeId)) {
          committeeMembers[nodeId].NodeReputation.NodeVirtualChainReputations[vcId] = reputation;
        } else {
          Logger.error(`While calculating reputations, a node EthAddress ${nodeId} was found, that is not a committee member.`);
        }
      } else {
        Logger.error(`While calculating reputations, a node OrbsAddress ${orbsAddress} was found, that is not a committee member.`);
      }
    });
  });

  const allBadReputation = data.Payload?.TimeEnteredBadReputation || {};
  _.map(allBadReputation, (badRepData, nodeId: string) => {
    if (_.has(committeeMembers, nodeId)) {
      const vcBadRep = committeeMembers[nodeId].NodeReputation.NodeVirtualChainBadReputations;
      _.map(badRepData, (badRep: number, vcId: string) => {
        vcBadRep[vcId] = badRep;
      });
    } else {
      Logger.error(`While calculating bad reputations, a node address ${nodeId} was found, that is not a committee member.`);
    }
  });

  _.map(committeeMembers, (node) => {
    const rep = node.NodeReputation;
    let result: string[] = [];
    _.map(rep.NodeVirtualChainBadReputations, (value, key) => {
      if (value !== 0) {
        result.push(`${key}=${value}`);
      }
    });
    if (result.length > 0) {
      rep.ReputationStatus = HealthLevel.Red;
      rep.ReputationToolTip = `Some VCs have non-zero time to be voted out (${result.join(',')})`;
    } else {
      result = [];
      _.map(rep.NodeVirtualChainReputations, (value, key) => {
        if (value !== 0) {
          result.push(`${key}=${value}`);
        }
      });
      if (result.length > 0) {
        rep.ReputationStatus = HealthLevel.Yellow;
        rep.ReputationToolTip = `Some VCs have non-zero reputations (${result.join(',')})`;
      }
    }
  });
}