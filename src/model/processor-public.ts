import _ from 'lodash';
import { Configuration } from '../config';
import { fetchJson, isStaleTime, getCurrentClockTime } from '../helpers';
import * as Logger from '../logger';
import { Model, VirtualChain, Service, Guardians, HealthLevel } from './model';
import * as URLs from './url-generator';

// Important URLS for public-network - init explore of network from these.
const ManagementStatusSuffix = '/services/management-service/status';
const EthWriterStatusSuffix = '/services/ethereum-writer/status';

export async function updateModel(model: Model, config: Configuration) {
  const rootNodeData = await fetchJson(`${config.RootNodeEndpoint}${ManagementStatusSuffix}`);

  const virtualChainList = readVirtualChains(rootNodeData, config);

  const services = [
    // choose the services that exist in a public network
    Service.Boyar,
    Service.Signer,
    Service.Management,
    Service.EthereumWriter,
    Service.Rewards,
  ];

  const guardians = readGuardians(rootNodeData);
  const committeeMembersAddresses = _.map(rootNodeData.Payload.CurrentCommittee, 'EthAddress');
  const committeeMembers = _.pick(guardians, committeeMembersAddresses);
  const standbyMembersAddresses = _.map(
    _.filter(rootNodeData.Payload.CurrentCandidates, (data) => data.IsStandby),
    'EthAddress'
  );
  const standByMembers = _.pick(guardians, standbyMembersAddresses);

  calcReputation(`${config.RootNodeEndpoint}${EthWriterStatusSuffix}`, committeeMembers);

  model.TimeSeconds = getCurrentClockTime();
  model.Timestamp = new Date().toISOString();
  model.VirtualChains = virtualChainList;
  model.Services = services;
  model.CommitteeNodes = committeeMembers;
  model.StandByNodes = standByMembers;
}

function readVirtualChains(rootNodeData: any, config: Configuration): VirtualChain[] {
  return _.map(rootNodeData.Payload.CurrentVirtualChains, (vcData, vcId) => {
    let expirationTime = _.isNumber(vcData.Expiration) ? vcData.Expiration : -1;
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
    let ip = _.isString(guardianData.Ip) ? guardianData.Ip : '';
    return {
      EthAddress: guardianData.EthAddress,
      Name: _.isString(guardianData.Name) ? guardianData.Name : '',
      Ip: ip,
      Website: _.isString(guardianData.Website) ? guardianData.Website : '',
      EffectiveStake: _.isNumber(guardianData.EffectiveStake) ? guardianData.EffectiveStake : 1,
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

async function calcReputation(url: string, committeeMembers: Guardians) {
  const data = await fetchJson(url);

  let orbsToEthAddr: { [key: string]: string } = {};
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
      let vcBadRep = committeeMembers[nodeId].NodeReputation.NodeVirtualChainBadReputations;
      _.map(badRepData, (badRep: number, vcId: string) => {
        vcBadRep[vcId] = badRep;
      });
    } else {
      Logger.error(`While calculating bad reputations, a node address ${nodeId} was found, that is not a committee member.`);
    }
  });

  _.map(committeeMembers, (node) => {
    let rep = node.NodeReputation;
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
