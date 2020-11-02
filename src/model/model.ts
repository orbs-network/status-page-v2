/**
 * Copyright 2020 the orbs-network/status-page-v2 authors
 * This file is part of the orbs-network/status-page-v2 library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

export class Model {
  TimeSeconds = 0; // UTC seconds
  Timestamp = '';
  VirtualChains: VirtualChain[] = [];
  Services: Service[] = [];
  CommitteeNodes: Guardians = {};
  StandByNodes: Guardians = {};
  AllRegisteredNodes: Guardians = {};
  EthereumStatus?: EthereumStatus = undefined; // only public-network
}

export interface EthereumStatus {
  StakingRewardsBalance: number;
  BootstrapRewardsBalance: number;
  LastStakeUnstakeTime: number;
  Status: HealthLevel;
  StatusToolTip: string;
}

export enum HealthLevel {
  Green = 'Green',
  Yellow = 'Yellow',
  Red = 'Red',
}

export interface VirtualChain {
  Id: string;
  Name: string;
  IsCertified: boolean;
  IsCanary: boolean;
  GenesisTimeSeconds: number;
  ExpirationTimeSeconds: number;
  SubscriptionStatus: HealthLevel;
  SubscriptionStatusToolTip: string;
  VirtualChainUrls: VirtualChainUrls;
}

export interface VirtualChainUrls {
  Prism: string;
  Subscription: string;
}

export class Service {
  constructor(readonly Name: string, readonly ServiceUrlName: string, readonly RepositoryPrefix: string) {}
  static VC = new Service('VC', 'vchains', 'https://github.com/orbs-network/orbs-network-go/tree/');
  static Boyar = new Service('Boyar', 'boyar', 'https://github.com/orbs-network/boyarin/tree/');
  static Signer = new Service('Signer', 'signer', 'https://github.com/orbs-network/signer-service/tree/');
  static EthereumWriter = new Service('EthereumWriter', 'ethereum-writer', 'https://github.com/orbs-network/ethereum-writer/tree/');
  static Logger = new Service('Logger', 'logs-service', 'https://github.com/orbs-network/logs-service/tree/');
  static Management = new Service('Management', 'management-service', 'https://github.com/orbs-network/management-service/tree/');
}

export interface Guardians {
  [key: string]: Guardian;
}

export interface Guardian {
  EthAddress: string;
  Name: string;
  Ip: string;
  Website: string;
  EffectiveStake: number;
  IsCertified: boolean;
  OrbsAddress: string;
  NodeManagementURL: string;
  NodeVirtualChains: NodeVirtualChains;
  NodeServices: NodeServices;
  NodeReputation: NodeReputation; // only public
}

export interface NodeServiceUrls {
  Status: string;
  Logs: string;
  Version: string;
  Metrics: string;
}

export interface NodeVirtualChainUrls extends NodeServiceUrls {
  Management: string;
}

export interface NodeVirtualChains {
  [key: string]: NodeVirtualChain;
}

export interface NodeVirtualChain {
  StatusMsg: string;
  Status: HealthLevel;
  StatusToolTip: string;
  Timestamp: string;
  Version: string;
  BlockHeight: number;
  BlockHeightToolTip: string;
  ProtocolVersion: number;
  URLs: NodeVirtualChainUrls;
}

export function nodeVirtualChainBuilder(
  urls: NodeVirtualChainUrls,
  statusMsg = '',
  status: HealthLevel = HealthLevel.Green,
  statusTooltip = '',
  timestamp = '',
  version = '',
  blockHeight = 0,
  blockHeightToolTip = '',
  protocolVersion = 0
): NodeVirtualChain {
  return {
    StatusMsg: statusMsg,
    Status: status,
    StatusToolTip: statusTooltip,
    Timestamp: timestamp,
    Version: version,
    BlockHeight: blockHeight,
    BlockHeightToolTip: blockHeightToolTip,
    ProtocolVersion: protocolVersion,
    URLs: urls,
  };
}

export interface NodeServices {
  [key: string]: NodeService;
}

export interface NodeService {
  StatusMsg: string;
  Status: HealthLevel;
  StatusToolTip: string;
  Timestamp: string;
  Version: string;
  URLs: NodeServiceUrls;
}

export function nodeServiceBuilder(
  urls: NodeServiceUrls,
  statusMsg = '',
  status: HealthLevel = HealthLevel.Green,
  statusTooltip = '',
  timestamp = '',
  version = ''
): NodeService {
  return {
    StatusMsg: statusMsg,
    Status: status,
    StatusToolTip: statusTooltip,
    Timestamp: timestamp,
    Version: version,
    URLs: urls,
  };
}

export interface NodeReputation {
  NodeVirtualChainReputations: NodeVirtualChainReputations;
  NodeVirtualChainBadReputations: NodeVirtualChainBadReputations;
  ReputationStatus: HealthLevel;
  ReputationToolTip: string;
}

export interface NodeVirtualChainReputations {
  [key: string]: number;
}

export interface NodeVirtualChainBadReputations {
  [key: string]: number;
}
