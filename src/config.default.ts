/**
 * Copyright 2020 the orbs-network/status-page-v2 authors
 * This file is part of the orbs-network/status-page-v2 library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import dotenv from 'dotenv';
import { Configuration, NetworkType } from './config';
import * as process from "process";
dotenv.config();

export const defaultConfiguration: Configuration = {
  Port: Number(process.env.PORT),
  ProcessorPollTimeSeconds: Number(process.env.POLL_INTERVAL_SECONDS) || 5 * 60,
  MonitorSuppressMsgs: process.env.MONITOR_SUPPRESS_MSGS ? String(process.env.MONITOR_SUPPRESS_MSGS).split(',') : [],
  MonitorSlackToken: String(process.env.SLACK_TOKEN || ''),
  MonitorSlackChannel: String(process.env.SLACK_CHANNEL) || 'prod-v2-monitoring',
  MonitorDiscordURL: String(process.env.DISCORD_URL || ''),

  StaleStatusTimeSeconds: Number(process.env.STATUS_STALE_TIME_SECONDS) || 15 * 60,
  RootNodeStaleWarnTimeSeconds: Number(process.env.ROOT_NODE_STALE_WARN_TIME_SECONDS) || 3600,
  RootNodeStaleErrorTimeSeconds: Number(process.env.ROOT_NODE_STALE_ERROR_TIME_SECONDS) || 43200,

  ExpirationWarningTimeInDays: Number(process.env.VC_EXPIRATION_WARN_DAYS) || 30,
  VCNameAdapter: JSON.parse(String(process.env.VC_NAME_OVERRIDE || "{}")),

  PingUrlEndpoints: process.env.PING_URL_ENDPOINTS ? String(process.env.PING_URL_ENDPOINTS).split(',') : [],
  PingUrlTimeoutsMillis: process.env.PING_URL_TIMEOUTS_MILLIS ? String(process.env.PING_URL_TIMEOUTS_MILLIS).split(',').map(el => Number(el)) : [],
  SslHosts: process.env.SSL_HOSTS ? String(process.env.SSL_HOSTS).split(',') : [],

  NetworkType: process.env.NETWORK_TYPE === NetworkType.Public ? NetworkType.Public : NetworkType.Private,
  RootNodeEndpoints: process.env.NETWORK_NODE_ENDPOINTS ? String(process.env.NETWORK_NODE_ENDPOINTS).split(',') : [],
  MaticRootNodeEndpoint: process.env.MaticRootNodeEndpoint || '',
  EthereumEndpoints: [String(process.env.ETHEREUM_ENDPOINT)],
  MaticEndpoints: [String(process.env.MATIC_ENDPOINT)],
  MaxTimeSinceLastEvent: Number(process.env.MAX_TIME_SECONDS_SINCE_LAST_EVENT) || 86400,
  MaxTimeSinceLastEventMatic: Number(process.env.MAX_TIME_SECONDS_SINCE_LAST_EVENT) || 86400*3,

  NetworksContracts: {
    "ETHEREUM": {
      staking: process.env.ETHEREUM_STAKING_CONTRACT || "0x01D59Af68E2dcb44e04C50e05F62E7043F2656C3",
      delegations: process.env.ETHEREUM_DELEGATIONS_CONTRACT || "0xB97178870F39d4389210086E4BcaccACD715c71d"
    },
    "MATIC": {
      staking: process.env.MATIC_STAKING_CONTRACT || "0xeeae6791f684117b7028b48cb5dd21186df80b9c",
      delegations: process.env.MATIC_DELEGATIONS_CONTRACT || "0x513d30e66641cB1f2670b5994DD8E2B61ED3C23c"
    }
  }
};
