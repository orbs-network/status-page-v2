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
import { Model, VirtualChain, Service, Guardians, HealthLevel, Guardian, GenStatus, StatusName, ExchangeEntry } from '../model/model';
import { getResources, getWeb3Provider } from './eth-helper';
import { generateErrorEthereumContractsStatus, getEthereumContractsStatus } from './ethereum';
import * as URLs from './url-generator';
import { getPoSStatus, getTotalCommitteeWeight } from './stats';
import BigNumber from 'bignumber.js';

// Important URLS for public-network - init explore of network from these.
const ManagementStatusSuffix = '/services/management-service/status';
const EthWriterStatusSuffix = '/services/ethereum-writer/status';
const MaticReaderStatusSuffix = '/services/matic-reader/status';

let validSupplyInCirculation = '';

export async function updateModel(model: Model, config: Configuration) {
  const rootNodeEndpoints = config.RootNodeEndpoints;

  for (const rootNodeEndpoint of rootNodeEndpoints) {
    try {
      await readData(model, rootNodeEndpoint, config);
      await readDataMatic(model, rootNodeEndpoint, config);
      const AllRegisteredNodesEth = model.AllRegisteredNodes;

      Logger.log(`Successfully readData from ${rootNodeEndpoint}`);

      await readDataMatic(model, rootNodeEndpoint, config);
      // override IsCertified with ETH IsCertified (always false in Polygon)
      for (const node in model.AllRegisteredNodes) {
        const isCertifiedEth = AllRegisteredNodesEth[node].IsCertified;
        model.AllRegisteredNodes[node].IsCertified = model.AllRegisteredNodes[node].IsCertified || isCertifiedEth;
        if (model.CommitteeNodes[node]) model.CommitteeNodes[node].IsCertified = model.CommitteeNodes[node].IsCertified || isCertifiedEth;
        if (model.StandByNodes[node]) model.StandByNodes[node].IsCertified = model.StandByNodes[node].IsCertified || isCertifiedEth;

        Logger.log(`Node eth ${node} is certified: ${model.AllRegisteredNodes[node].IsCertified}`);
      }
      // return
    } catch (e) {
      Logger.log(`Warning: failed to readData, trying another node. Error: ${e}`);
    }
  }

  // throw new Error(`Error while creating Status Page, readData failed for all network nodes.`);
}

function deepMergeWithNetworkSet<T>(target: T, source: Partial<T>): T {
  if (
    typeof source === 'object' &&
    source !== null &&
    typeof target === 'object' &&
    target !== null
  ) {
    const result: any = { ...target };
    for (const key of Object.keys(source) as (keyof T)[]) {
      const sourceVal = source[key];
      if (sourceVal === undefined) continue;

      const targetVal = target[key];

      if (key === "Network" && Array.isArray(sourceVal)) {
        const existing = Array.isArray(targetVal) ? targetVal : [];
        const combined = Array.from(new Set([...existing, ...sourceVal]));
        result[key] = combined;
      } else if (
        typeof sourceVal === 'object' &&
        sourceVal !== null &&
        typeof targetVal === 'object' &&
        targetVal !== null &&
        !Array.isArray(sourceVal) &&
        !Array.isArray(targetVal)
      ) {
        result[key] = deepMergeWithNetworkSet(targetVal, sourceVal as Partial<any>);
      } else {
        result[key] = sourceVal;
      }
    }
    return result;
  }

  return source as T;
}

function mergeGuardians(newGuardians: Guardians, oldGuardians: Guardians) {
  for (const key in newGuardians) {
    if (newGuardians.hasOwnProperty(key)) {
      const newGuardian = newGuardians[key];
      const ethAddress = newGuardian.EthAddress;
      const existingGuardian = oldGuardians[ethAddress];

      if (existingGuardian) {
        oldGuardians[ethAddress] = deepMergeWithNetworkSet(existingGuardian, newGuardian);
      } else {
        oldGuardians[ethAddress] = newGuardian;
      }
    }
  }
}

// @ts-ignore
async function readData(model: Model, rootNodeEndpoint: string, config: Configuration) {
  let rootNodeData;

  if (rootNodeEndpoint.indexOf("127.0.0.1")>-1 || rootNodeEndpoint.indexOf("localhost")>-1) {
    rootNodeData = await fetchJson(`${rootNodeEndpoint}`);
  } else {
    rootNodeData = await fetchJson(`${rootNodeEndpoint}${ManagementStatusSuffix}`);
  }

  const vmServices = readVmServices(rootNodeData.Payload.CurrentImageVersions.main);

  const virtualChainList = readVirtualChains(rootNodeData, config);

  const services = [
    // choose the services that exist in a public network
    Service.Boyar,
    Service.Controller,
    Service.Signer,
    Service.Logger,
    Service.Management,
    Service.EthereumWriter,
    Service.MaticReader,
    Service.MaticWriter,
    ...vmServices
  ];

  let committeeMembers = {};
  let standByMembers = {};

  const currentRefTime = rootNodeData.Payload?.CurrentRefTime || 0;
  model.Statuses[StatusName.RootNode] = generateRootNodeStatus(rootNodeEndpoint, currentRefTime, config);

  const guardians = readGuardians(rootNodeData, 'Ethereum');
  const committeeMembersAddresses = _.map(rootNodeData.Payload.CurrentCommittee, 'EthAddress');
  committeeMembers = _.pick(guardians, committeeMembersAddresses);
  if (_.size(committeeMembers) === 0) {
    Logger.error(`Could not read a valid Ethereum Committee, current network seems empty.`);
  }
  const standbyMembersAddresses = _.map(
    _.filter(rootNodeData.Payload.CurrentCandidates, data => data.IsStandby),
    'EthAddress'
  );
  standByMembers = _.pick(guardians, standbyMembersAddresses);

  try {
    await calcReputation(`${rootNodeEndpoint}${EthWriterStatusSuffix}`, committeeMembers);
  } catch (e) {
    Logger.error(`Error while attempting to fetch ethereum reputation data. skipping: ${e}`);
  }

  model.TimeSeconds = getCurrentClockTime();
  model.Timestamp = new Date().toISOString();
  model.VirtualChains = virtualChainList;
  model.Services = services;
  mergeGuardians (committeeMembers, model.CommitteeNodes);
  mergeGuardians(standByMembers, model.StandByNodes);
  const allRegisteredNodes = _.mapValues(guardians, g => {
    return copyGuardianForAllRegistered(g);
  });
  mergeGuardians(allRegisteredNodes, model.AllRegisteredNodes);

  const web3 = await getWeb3Provider(config.EthereumEndpoints);

  if (web3) {
    const resources = await getResources(rootNodeData, web3);

    ///////////////////////
    model.Exchanges.Coinmarketcap = null;
    let pos;
    try {
      pos = await getPoSStatus(model, resources, web3);
      model.SupplyData = pos.SupplyData;
      validSupplyInCirculation = model.SupplyData.supplyInCirculation;
      model.PoSData = pos.PosData;

      model.EthDelegators = _.mapValues(pos.PosData.DelegationData, delegators => {
        return delegators.size;
      });

      model.Exchanges.Coinmarketcap = getCoinmarketcapInfo(model.SupplyData.totalSupply, model.SupplyData.decimals);
    } catch (e) {
      model.Statuses[StatusName.EthereumContracts] = generateErrorEthereumContractsStatus(`Error while attempting to fetch Pos Data: ${e.stack}`);
      Logger.error(model.Statuses[StatusName.EthereumContracts].StatusToolTip);
    }

    ///////////////////////
    try {
      const totalWeight = model.PoSData ? model.PoSData.CommitteeData.TotalCommitteeWeight : 0;
      const rewardsRate = model.PoSData ? model.PoSData.RewardsAndFeeData.CurrentStakingRewardPrecentMille / 100000 : 0;

      const numberOfCertifiedInCommittee = _.size(_.pickBy(model.CommitteeNodes, g => g.IsCertified));
      model.Statuses[StatusName.EthereumContracts] = await getEthereumContractsStatus(
        numberOfCertifiedInCommittee,
        resources,
        web3,
        config,
        totalWeight,
        rewardsRate
      );
    } catch (e) {
      model.Statuses[StatusName.EthereumContracts] = generateErrorEthereumContractsStatus(`Error while attempting to fetch contracts status data: ${e.stack}`);
      Logger.error(model.Statuses[StatusName.EthereumContracts].StatusToolTip);
    }
  }
  // calc exchange data regardless if contract fetch was successful
    if (validSupplyInCirculation.length) {
      try {
        model.Exchanges.Upbit = await getUpbitInfo(validSupplyInCirculation);
      } catch (e) {
        Logger.error('Failed to fetch Upbit data')
        model.Exchanges.Upbit = {error: 'Failed to fetch Upbit data'};
      }
    }
    else {
      model.Exchanges.Upbit = {error: 'no valid SupplyInCirculation fetched yet'};
    }
}

async function readDataMatic(model: Model, rootNodeEndpoint: string, config: Configuration) {
  const rootNodeData = await fetchJson(`${rootNodeEndpoint}${MaticReaderStatusSuffix}`);

  let committeeMembers = model.CommitteeNodes;
  let standByMembers = model.StandByNodes;

  const guardians = readGuardians(rootNodeData, 'Matic');
  const committeeMembersAddresses = _.map(rootNodeData.Payload.CurrentCommittee, 'EthAddress');
  committeeMembers = _.pick(guardians, committeeMembersAddresses);
  if (_.size(committeeMembers) === 0) {
    Logger.error(`Could not read a valid Matic Committee, current network seems empty.`);
  }
  const standbyMembersAddresses = _.map(
    _.filter(rootNodeData.Payload.CurrentCandidates, data => data.IsStandby),
    'EthAddress'
  );
  standByMembers = _.pick(guardians, standbyMembersAddresses);

  committeeMembersAddresses.forEach(addr => {
    if (!(addr in model.CommitteeNodes)) {
      model.CommitteeNodes[addr] = committeeMembers[addr];
    } else if (model.CommitteeNodes[addr].OrbsAddress === committeeMembers[addr].OrbsAddress) {
      model.CommitteeNodes[addr].Network = model.CommitteeNodes[addr].Network.concat(committeeMembers[addr].Network);
    }
  });

  standbyMembersAddresses.forEach(addr => {
    if (!(addr in model.StandByNodes)) {
      model.StandByNodes[addr] = standByMembers[addr];
    } else if (model.StandByNodes[addr].OrbsAddress === standByMembers[addr].OrbsAddress) {
      model.StandByNodes[addr].Network = model.StandByNodes[addr].Network.concat(standByMembers[addr].Network);
    }
  });

  const allRegisteredNodes = _.mapValues(guardians, g => {
    return copyGuardianForAllRegistered(g);
  });

  Object.keys(allRegisteredNodes).forEach(addr => {
    if (!(addr in model.AllRegisteredNodes)) {
      model.AllRegisteredNodes[addr] = allRegisteredNodes[addr];
    } else if (model.AllRegisteredNodes[addr].OrbsAddress === allRegisteredNodes[addr].OrbsAddress) {
      model.AllRegisteredNodes[addr].Network = model.AllRegisteredNodes[addr].Network.concat(allRegisteredNodes[addr].Network);
    }
  });

  const web3 = await getWeb3Provider(config.MaticEndpoints);

  if (web3) {
    const resources = await getResources(rootNodeData, web3);
    Logger.log(`Reading PoS status for Matic network id: ${await web3.eth.getChainId()}`);
    const pos = await getPoSStatus(model, resources, web3);
    model.PoSDataMatic = pos.PosData;

    model.MaticDelegators = _.mapValues(pos.PosData.DelegationData, delegators => {
      return delegators.size;
    });

    ///////////////////////
    try {
      const totalWeight = getTotalCommitteeWeight(committeeMembers);
      const rewardsRate = parseInt(await resources.stakingRewardsContract.methods.getCurrentStakingRewardsRatePercentMille().call()) / 100000;

      const numberOfCertifiedInCommittee = _.size(_.pickBy(committeeMembers, g => g.IsCertified));

      model.Statuses[StatusName.MaticContracts] = await getEthereumContractsStatus(
        numberOfCertifiedInCommittee,
        resources,
        web3,
        config,
        totalWeight,
        rewardsRate
      );

    } catch (e) {
      model.Statuses[StatusName.MaticContracts] = generateErrorEthereumContractsStatus(`Error while attempting to fetch Matic status data: ${e.stack}`);
      Logger.error(model.Statuses[StatusName.MaticContracts].StatusToolTip);
    }
  }
}

function generateRootNodeStatus(rootNodeEndpoint: string, currentRefTime: string | number, config: Configuration): GenStatus {
  let rootNodeStatus = HealthLevel.Green;
  let rootNodeStatusMsg = 'Status Page: OK';
  let rootNodeStatusToolTip = 'Network Information Up-to-date';
  if (isStaleTime(currentRefTime, config.RootNodeStaleWarnTimeSeconds)) {
    const timeMsg = `Status information is from ${currentRefTime > 0 ? timeAgoText(currentRefTime) : 'unknown time'}`;
    Logger.log(`${timeMsg}. Service might be syncing or ethereum outage.`);
    if (isStaleTime(currentRefTime, config.RootNodeStaleErrorTimeSeconds)) {
      rootNodeStatus = HealthLevel.Yellow;
      rootNodeStatusMsg = 'Status Page: Issues Detected';
      rootNodeStatusToolTip = `${timeMsg}. Root node used to query status is out of sync. Consider replacing root node (IP:${rootNodeEndpoint}).`;
    } else {
      rootNodeStatus = HealthLevel.Yellow;
      rootNodeStatusMsg = 'Status Page: Issues Detected';
      rootNodeStatusToolTip = `${timeMsg}. Root node used to query status is out of sync. Please check root node (IP:${rootNodeEndpoint}).`;
    }
  }

  return {
    Status: rootNodeStatus,
    StatusMsg: rootNodeStatusMsg,
    StatusToolTip: rootNodeStatusToolTip
  };
}

function readVirtualChains(rootNodeData: any, config: Configuration): VirtualChain[] {
  return _.map(rootNodeData.Payload.CurrentVirtualChains, (vcData, vcId) => {
    const expirationTime = _.isNumber(vcData.Expiration) ? vcData.Expiration : -1;
    let healthLevel = HealthLevel.Green;
    let healthLevelToolTip = '';
    if (expirationTime > 0) {
      if (isStaleTime(expirationTime, 0)) {
        healthLevel = HealthLevel.Yellow;
        healthLevelToolTip = 'VirtualChain expired.';
      } else if (getCurrentClockTime() > expirationTime - config.ExpirationWarningTimeInDays * 24 * 60 * 60) {
        healthLevel = HealthLevel.Yellow;
        healthLevelToolTip = `VirtualChain will expire in less than ${config.ExpirationWarningTimeInDays} days.`;
      }
    }

    return {
      Id: vcId,
      Name: vcName(vcId, vcData.Name, config),
      IsCanary: _.isString(vcData.RolloutGroup) ? vcData.RolloutGroup != 'main' : false,
      IsCertified: _.isNumber(vcData.IdentityType) ? vcData.IdentityType === 1 : false,
      GenesisTimeSeconds: _.isNumber(vcData.GenesisRefTime) ? vcData.GenesisRefTime : 0,
      ExpirationTimeSeconds: expirationTime,
      SubscriptionStatus: healthLevel,
      SubscriptionStatusToolTip: healthLevelToolTip,
      VirtualChainUrls: URLs.generateVirtualChainUrls(vcId)
    };
  });
}

function readVmServices(currentImageVersions: any) {
  const result: Service[] = [];
  for (const key in currentImageVersions) {
    if (_.startsWith(key, 'vm-')) {
      result.push(new Service(key, key, undefined));
    }
  }
  return result;
}

function vcName(vcId: string, vcName: string, config: Configuration) {
  if (_.has(config.VCNameAdapter, vcId)) {
    return config.VCNameAdapter[vcId];
  } else if (_.isString(vcName)) {
    return vcName;
  }
  return '';
}

function readGuardians(rootNodeData: any, network: string): Guardians {
  return _.mapValues(rootNodeData.Payload.Guardians, guardianData => {
    const ip = _.isString(guardianData.Ip) ? guardianData.Ip : '';
    return {
      EthAddress: guardianData.EthAddress,
      Network: [network],
      Name: _.isString(guardianData.Name) ? guardianData.Name : '',
      Ip: ip,
      Website: _.isString(guardianData.Website) ? guardianData.Website : '',
      EffectiveStake: _.isNumber(guardianData.EffectiveStake) ? guardianData.EffectiveStake : 0,
      SelfStake: _.isNumber(guardianData.SelfStake[network]) ? guardianData.SelfStake[network] : 0,
      DelegatedStake: _.isNumber(guardianData.DelegatedStake[network]) ? guardianData.DelegatedStake[network] : 0,
      IsCertified: _.isNumber(guardianData.IdentityType) ? guardianData.IdentityType === 1 : false,
      OrbsAddress: _.isString(guardianData.OrbsAddress) ? guardianData.OrbsAddress : '',
      NodeManagementURL: URLs.generateNodeManagmentUrl(ip),
      NodeVirtualChains: {},
      NodeServices: {},
      NodeReputation: {
        NodeVirtualChainReputations: {},
        NodeVirtualChainBadReputations: {},
        ReputationStatus: HealthLevel.Green,
        ReputationToolTip: ''
      }
    };
  });
}

function copyGuardianForAllRegistered(guardianData: Guardian): Guardian {
  return {
    EthAddress: guardianData.EthAddress,
    Network: guardianData.Network,
    Name: guardianData.Name,
    Ip: guardianData.Ip,
    Website: guardianData.Website,
    EffectiveStake: guardianData.EffectiveStake,
    SelfStake: guardianData.SelfStake,
    DelegatedStake: guardianData.DelegatedStake,
    IsCertified: guardianData.IsCertified,
    OrbsAddress: guardianData.OrbsAddress,
    NodeManagementURL: URLs.generateNodeManagmentUrl(guardianData.Ip),
    NodeVirtualChains: {},
    NodeServices: {},
    NodeReputation: {
      NodeVirtualChainReputations: {},
      NodeVirtualChainBadReputations: {},
      ReputationStatus: HealthLevel.Gray,
      ReputationToolTip: ''
    }
  };
}

async function calcReputation(url: string, committeeMembers: Guardians) {
  const data = await fetchJson(url);

  const orbsToEthAddr: { [key: string]: string } = {};
  _.map(committeeMembers, node => {
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

  _.map(committeeMembers, node => {
    const rep = node.NodeReputation;
    const result: string[] = [];
    let foundRed = false;
    _.map(rep.NodeVirtualChainReputations, (value, key) => {
      if (value !== 0) {
        if (rep.NodeVirtualChainBadReputations[key] !== 0) {
          foundRed = true;
          result.push(`VC '${key}': reputation issue severity ${value} started ${timeAgoText(rep.NodeVirtualChainBadReputations[key])}`);
        } else {
          result.push(`VC '${key}': reputation issue severity ${value}`);
        }
      }
    });
    if (result.length > 0) {
      rep.ReputationStatus = foundRed ? HealthLevel.Yellow : HealthLevel.Yellow;
      rep.ReputationToolTip = result.join(', ');
    }
  });
}

async function getUpbitInfo(circulatingSupply: string): Promise<ExchangeEntry[]> {
  // TODO: first draft
  const url = 'https://api.upbit.com/v1/ticker?markets=KRW-ORBS%2CUSDT-BTC%2CBTC-ORBS';
  const idrUrl = 'https://id-api.upbit.com/v1/ticker?markets=IDR-BTC';
  const sgdUrl = 'https://sg-api.upbit.com/v1/ticker?markets=SGD-BTC';
  const thbUrl = 'https://th-api.upbit.com/v1/ticker?markets=THB-BTC';

  const [krwOrbs, usdtBtc, btcOrbs] = (await fetchJson(url)).map((v: any) => v.trade_price);
  // const data = await fetchJson(url);
  const idrBtc = (await fetchJson(idrUrl))[0].trade_price;
  const sgdBtc = (await fetchJson(sgdUrl))[0].trade_price;
  const thbBtc = (await fetchJson(thbUrl))[0].trade_price;

  const usdtOrbs = new BigNumber(usdtBtc).multipliedBy(btcOrbs).toNumber();
  const isdrOrbs = new BigNumber(idrBtc).multipliedBy(btcOrbs).toNumber();
  const sgdOrbs = new BigNumber(sgdBtc).multipliedBy(btcOrbs).toNumber();
  const thbOrbs = new BigNumber(thbBtc).multipliedBy(btcOrbs).toNumber();
  const normCirculatingSupply = new BigNumber(circulatingSupply).dividedBy(1e18);

  return [
    {
      symbol: 'ORBS',
      currencyCode: 'KRW',
      price: krwOrbs,
      marketCap: normCirculatingSupply.multipliedBy(krwOrbs).toNumber(),
      accTradePrice24h: null,
      circulatingSupply: Number(normCirculatingSupply),
      maxSupply: 10000000000,
      provider: 'ORBS Ltd.',
      lastUpdatedTimestamp: Date.now()
    },
    {
      symbol: 'ORBS',
      currencyCode: 'USDT',
      price: usdtOrbs,
      marketCap: normCirculatingSupply.multipliedBy(usdtOrbs).toNumber(),
      accTradePrice24h: null,
      circulatingSupply: Number(normCirculatingSupply),
      maxSupply: 10000000000,
      provider: 'ORBS Ltd.',
      lastUpdatedTimestamp: Date.now()
    },
    {
      symbol: 'ORBS',
      currencyCode: 'IDR',
      price: isdrOrbs,
      marketCap: normCirculatingSupply.multipliedBy(isdrOrbs).toNumber(),
      accTradePrice24h: null,
      circulatingSupply: Number(normCirculatingSupply),
      maxSupply: 10000000000,
      provider: 'ORBS Ltd.',
      lastUpdatedTimestamp: Date.now()
    },
    {
      symbol: 'ORBS',
      currencyCode: 'SGD',
      price: sgdOrbs,
      marketCap: normCirculatingSupply.multipliedBy(sgdOrbs).toNumber(),
      accTradePrice24h: null,
      circulatingSupply: Number(normCirculatingSupply),
      maxSupply: 10000000000,
      provider: 'ORBS Ltd.',
      lastUpdatedTimestamp: Date.now()
    },
    {
      symbol: 'ORBS',
      currencyCode: 'THB',
      price: thbOrbs,
      marketCap: normCirculatingSupply.multipliedBy(thbOrbs).toNumber(),
      accTradePrice24h: null,
      circulatingSupply: Number(normCirculatingSupply),
      maxSupply: 10000000000,
      provider: 'ORBS Ltd.',
      lastUpdatedTimestamp: Date.now()
    }
  ];
}

function getCoinmarketcapInfo(totalSupply: string, decimals: string): number {
  return new BigNumber(totalSupply).dividedBy(new BigNumber(10).exponentiatedBy(decimals)).toNumber();
}
