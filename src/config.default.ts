/**
 * Copyright 2020 the orbs-network/status-page-v2 authors
 * This file is part of the orbs-network/status-page-v2 library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import dotenv from 'dotenv';
import { Configuration, NetworkType } from './config';
dotenv.config();

export const defaultConfiguration: Configuration = {
  Port: Number(process.env.PORT),
  ProcessorPollTimeSeconds: Number(process.env.POLL_INTERVAL_SECONDS) || 5 * 60,
  SlackToken: String(process.env.SLACK_TOKEN),
  SlackChannel: String(process.env.SLACK_CHANNEL) || 'prod-v2-monitoring',
  HealthCheckTimeOfDayInSeconds: Number(process.env.HEALTH_CHECK_TIME_OF_DAY_IN_SECONDS) || 21600,

  StaleStatusTimeSeconds: Number(process.env.STATUS_STALE_TIME_SECONDS) || 15 * 60,
  ExpirationWarningTimeInDays: Number(process.env.VC_EXPIRATION_WARN_DAYS) || 30,

  NetworkType: process.env.NETWORK_TYPE === NetworkType.Public ? NetworkType.Public : NetworkType.Private,
  RootNodeEndpoints: process.env.NETWORK_NODE_ENDPOINTS ? String(process.env.NETWORK_NODE_ENDPOINTS).split(',') : [],

  EthereumEndpoint: String(process.env.ETHEREUM_ENDPOINT),
  StakingRewardsAddress: String(process.env.STAKING_REWARD_ADDRESS),
  BootstrapRewardsAddress: String(process.env.BOOTSTRAP_REWARD_ADDRESS),
  StakingAddress: String(process.env.STAKING_ADDRESS),
  MinStakingBlance: Number(process.env.MIN_STAKING_BALANCE) || 1000,
  MinBootstrapBlance: Number(process.env.MIN_BOOTSTRAP_BALANCE) || 33,
  MaxTimeSinceLastEvent: Number(process.env.MAX_TIME_SINCE_LAST_EVENT) || 86400,
};
