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
  Statuses: { [key: string]: GenStatus } = {};
  VirtualChains: VirtualChain[] = [];
  Services: Service[] = [];
  CommitteeNodes: Guardians = {};
  StandByNodes: Guardians = {};
  AllRegisteredNodes: Guardians = {};
  SupplyData?: SupplyStatus = undefined; // only public-network
  PoSData?: PoSStatus = undefined; // only public-network
  PoSDataMatic?: PoSStatus = undefined; // only public-network
  Exchanges?: any = {};
  CriticalAlert = false;
  EthDelegators?: any = {};
  MaticDelegators?: any = {};
}

export enum StatusName {
  RootNode = 'Root Node Health',
  EthereumContracts = 'Ethereum Contracts Health',
  MaticContracts = 'Matic Contracts Health',
  PingUrls = 'Monitored URLs Health',
  Certs = 'Monitored Certs Health'
}
export interface GenStatus {
  Status: HealthLevel;
  StatusToolTip: any;
  StatusMsg: string;
}

export interface RootNodeStatus extends GenStatus {}

export enum HealthLevel {
  Green = 'Green',
  Yellow = 'Yellow',
  Red = 'Red',
  Gray = 'Gray',
  Blue = 'Blue'
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
  constructor(readonly Name: string, readonly ServiceUrlName: string, readonly RepositoryPrefix?: string) {}
  static VC = new Service('VC', 'vchains', 'https://github.com/orbs-network/orbs-network-go/tree/');
  static Boyar = new Service('Boyar', 'boyar', 'https://github.com/orbs-network/boyarin/tree/');
  static Signer = new Service('Signer', 'signer', 'https://github.com/orbs-network/signer-service/tree/');
  static EthereumWriter = new Service('EthereumWriter', 'ethereum-writer', 'https://github.com/orbs-network/ethereum-writer/tree/');
  static Logger = new Service('Logger', 'logs-service', 'https://github.com/orbs-network/logs-service/tree/');
  static Management = new Service('Management', 'management-service', 'https://github.com/orbs-network/management-service/tree/');
  static MaticReader = new Service('MaticReader', 'matic-reader', 'https://github.com/orbs-network/management-service/tree/');
  static MaticWriter = new Service('MaticWriter', 'matic-writer', 'https://github.com/orbs-network/ethereum-writer/tree/');
  static Controller = new Service('Controller', 'controller', 'https://github.com/orbs-network/v3-node-setup');
}

export interface Guardians {
  [key: string]: Guardian;
}

export interface Guardian {
  EthAddress: string;
  Network: string[];
  Name: string;
  Ip: string;
  Website: string;
  EffectiveStake: number;
  SelfStake?: number;
  DelegatedStake?: number;
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

export interface NodeVirtualChain extends GenStatus {
  Timestamp: string;
  Version: string;
  BlockHeight: number;
  BlockHeightToolTip: string;
  ProtocolVersion: number;
  URLs: NodeVirtualChainUrls;
}

export function nodeVirtualChainCopy(vc: NodeVirtualChain) {
  return {
    StatusMsg: vc.StatusMsg,
    Status: vc.Status,
    StatusToolTip: vc.StatusToolTip,
    Timestamp: vc.Timestamp,
    Version: vc.Version,
    BlockHeight: vc.BlockHeight,
    BlockHeightToolTip: vc.BlockHeightToolTip,
    ProtocolVersion: vc.ProtocolVersion,
    URLs: vc.URLs
  };
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
    URLs: urls
  };
}

export interface NodeServices {
  [key: string]: NodeService;
}

export interface NodeService extends GenStatus {
  Timestamp: string;
  Version: string;
  URLs: NodeServiceUrls;
  StatusSpec?: { [key: string]: string };
  VMStatusJson?: object;
}

export function nodeServiceCopy(ns: NodeService) {
  if (ns === undefined) {
    return {
        StatusMsg: '',
        Status: HealthLevel.Gray,
        StatusToolTip: '',
        Timestamp: '',
        Version: '',
        URLs: { Status: '', Logs: '', Version: '', Metrics: '' }
    }
  }

  return {
    StatusMsg: ns.StatusMsg,
    Status: ns.Status,
    StatusToolTip: ns.StatusToolTip,
    Timestamp: ns.Timestamp,
    Version: ns.Version,
    URLs: ns.URLs
  };
}

export function nodeServiceBuilder(
  urls: NodeServiceUrls,
  statusMsg = '',
  status: HealthLevel = HealthLevel.Green,
  statusTooltip = '',
  timestamp = '',
  version = '',
  StatusSpec?: { [key: string]: string },
  vmStatusJson?: object
): NodeService {
  return {
    StatusMsg: statusMsg,
    Status: status,
    VMStatusJson: vmStatusJson,
    StatusToolTip: statusTooltip,
    Timestamp: timestamp,
    Version: version,
    URLs: urls,
    StatusSpec
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

export interface EthereumStatus extends GenStatus {
  StakingRewardsBalance?: number;
  StakingRewardsAllocated?: number;
  StakingRewardsTwoWeeks?: number;
  BootstrapRewardsBalance?: number;
  BootstrapRewardsAllocated?: number;
  BootstrapRewardsTwoWeeks?: number;
  LastStakeUnstakeTime?: number;
}

export interface SupplyStatus {
  contract: string;
  stakingContract: string;
  nonCirculatingWallets: string[];
  supplyInCirculation: string;
  totalSupply: string;
  decimals: string;
  block: number;
  blockTimestamp: number;
  updatedAt: string;
}

export interface PoSStatus {
  Header: Header;
  TokenData: TokenData;
  StakedTokenData: StakedTokenData;
  RewardsAndFeeData: RewardsAndFeeData;
  CommitteeData: CommitteeData;
  GeneralData: PoSV2General;
}

export interface Header {
  BlockNumber: number;
  BlockTimestamp: number;
  BlockTime: string;
}

export interface TokenData {
  Contract: string;
  Decimals: string;
  TotalSupply: string;
  SupplyInCirculation: string;
  DailyActivityNumberOfTransfers: string;
  DailyActivityTokenTransferred: string;
}

export interface StakedTokenData {
  Contract: string;
  Decimals: string;
  StakedTokens: string;
  UnstakedTokens: string;
  NumberOfAllPastStakers: number;
  NumberOfActiveStakers: number;
}

export interface RewardsAndFeeData {
  CurrentStakingRewardPrecentMille: number;
  GeneralCommitteeGuardianMonthlyBootstrapFund: string;
  CertifiedCommitteeGuardianMonthlyBoostrapFund: string;
  GeneralCommitteeGuardianMonthlyFee: string;
  CertifiedCommitteeGuardianMonthlyFee: string;
  GeneralCommitteeGuardianBacklogFee: string;
  CertifiedCommitteeGuardianBacklogFee: string;
  UnclaimedStakingRewards: string;
  AwardedStakingRewards: string;
}

export interface CommitteeData {
  CommitteeMembersData: {
    Committee: string[];
    Weights: number[];
    Certification: boolean[];
    OrbsAddresses: string[];
    Ips: string[];
  };
  CommitteeSize: number;
  CertifiedComitteeSize: number;
  TotalCommitteeWeight: number;
  CertifiedCommitteeWeight: number;
  StandByAddresses: string[];
  AllRegisteredAddresses: string[];
}

export interface PoSV2General {
  TotalDelegatedStake: string;
}

export interface ExchangeEntry {
  symbol: string;
  currencyCode: string;
  price: number;
  marketCap: number;
  accTradePrice24h: null;
  circulatingSupply: number;
  maxSupply: number;
  provider: string;
  lastUpdatedTimestamp: number;
}
