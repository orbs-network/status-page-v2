import dotenv from 'dotenv';
import { Configuration, NetworkType } from './config';
dotenv.config();

export const defaultConfiguration: Configuration = {
  Port: Number(process.env.PORT),

  ProcessorPollTimeSeconds: Number(process.env.POLL_INTERVAL_SECONDS) || 5 * 60,
  StaleStatusTimeSeconds: Number(process.env.STATUS_STALE_TIME_SECONDS) || 15 * 60,
  ExpirationWarningTimeInDays: Number(process.env.VC_EXPIRATION_WARN_DAYS) || 30,
  
  NetworkType: process.env.NETWORK_TYPE === NetworkType.Public ? NetworkType.Public: NetworkType.Private,
  RootNodeEndpoints: String(process.env.NETWORK_NODE_ENDPOINTS).split(','),
  
  EthereumEndpoint: String(process.env.ETHEREUM_ENDPOINT),
  StakingRewardsAddress: String(process.env.STAKING_REWARD_ADDRESS),
  BootstrapRewardsAddress: String(process.env.BOOTSTRAP_REWARD_ADDRESS),
  StakingAddress: String(process.env.STAKING_ADDRESS),
  MinStakingBlance: Number(process.env.MIN_STAKING_BALANCE) || 1,
  MinBootstrapBlance: Number(process.env.MIN_BOOTSTRAP_BALANCE) || 1,
  MaxTimeSinceLastEvent: Number(process.env.MAX_TIME_SINCE_LAST_EVENT) || 86400,
};
