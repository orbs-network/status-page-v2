export class Model {
  TimeSeconds = 0; // UTC seconds
  Timestamp: string = '';
  VirtualChains: VirtualChain[] = [];
  Services: Service[] = [];
  CommitteeNodes: Guardians = {};
  StandByNodes: Guardians = {};
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
  static EthereumWriter = new Service(
    'EthereumWriter',
    'ethereum-writer',
    'https://github.com/orbs-network/ethereum-writer/tree/'
  );
  static Rewards = new Service('Rewards', 'rewards-service', 'https://github.com/orbs-network/rewards-service/tree/');
  static Management = new Service(
    'Management',
    'management-service',
    'https://github.com/orbs-network/management-service/tree/'
  );
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
  NodeReputation: NodeReputation;
}

export interface NodeServiceUrls {
  Status: string;
  Logs: string;
  Version: string;
}

export interface NodeVirtualChainUrls extends NodeServiceUrls {
  Management: string;
}

export interface NodeVirtualChains {
  [key: string]: NodeVirtualChain;
}

export interface NodeVirtualChain {
  BlockHeight: number;
  BlockHeightToolTip: string;
  Version: string;
  Commit: string;
  ProtocolVersion: number;
  StatusMsg: string;
  ErrorMsg: string;
  Timestamp: string;
  Status: HealthLevel;
  StatusToolTip: string;
  URLs: NodeVirtualChainUrls;
}

export interface NodeServices {
  [key: string]: NodeService;
}

export interface NodeService {
  Version: string;
  Commit: string;
  StatusMsg: string;
  ErrorMsg: string;
  Timestamp: string;
  Status: HealthLevel;
  StatusToolTip: string;
  URLs: NodeServiceUrls;
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
