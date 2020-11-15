/**
 * Copyright 2020 the orbs-network/status-page-v2 authors
 * This file is part of the orbs-network/status-page-v2 library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

export interface Configuration {
  // server settings
  Port: number;
  ProcessorPollTimeSeconds: number;
  SlackToken: string;
  SlackChannel: string;
  HealthCheckTimeOfDayInSeconds: number;
  RootNodeStaleWarnTimeSeconds: number;
  RootNodeStaleErrorTimeSeconds: number;
  VCNameAdapter: any;
  // staleness
  StaleStatusTimeSeconds: number;
  ExpirationWarningTimeInDays: number;
  // network
  NetworkType: NetworkType;
  RootNodeEndpoints: string[];
  // ethereum
  EthereumEndpoint: string;
  StakingRewardsAddress: string;
  BootstrapRewardsAddress: string;
  StakingAddress: string;
  MinStakingBlance: number;
  MinBootstrapBlance: number;
  MaxTimeSinceLastEvent: number;
}

export enum NetworkType {
  Public = 'public',
  Private = 'private',
}

export function validateConfiguration(config: Configuration) {
  if (!config.Port) {
    throw new Error(`Port is empty or zero.`);
  }
  if (typeof config.Port != 'number') {
    throw new Error(`Port is not a number.`);
  }
  if (!config.ProcessorPollTimeSeconds) {
    throw new Error(`ProcessorPollTimeSeconds is empty or zero.`);
  }
  if (typeof config.ProcessorPollTimeSeconds != 'number') {
    throw new Error(`ProcessorPollTimeSeconds is not a number.`);
  }
  if (!config.NetworkType || !(config.NetworkType === NetworkType.Private || config.NetworkType === NetworkType.Public)) {
    throw new Error(`NetworkType is empty (or wrong) in config.`);
  }
  if (!config.RootNodeEndpoints || config.RootNodeEndpoints.length === 0 || config.RootNodeEndpoints[0] === '') {
    throw new Error(`RootNodeEndpoints is empty in config.`);
  }
  if (typeof config.StaleStatusTimeSeconds != 'number') {
    throw new Error(`StaleStatusTimeSeconds is not a number.`);
  }
  if (!config.StaleStatusTimeSeconds || config.StaleStatusTimeSeconds <= 0) {
    throw new Error(`StaleStatusTimeSeconds is empty, zero or negative.`);
  }
  if (typeof config.ExpirationWarningTimeInDays != 'number') {
    throw new Error(`ExpirationWarningTimeInDays is not a number.`);
  }
  if (!config.ExpirationWarningTimeInDays || config.ExpirationWarningTimeInDays <= 0) {
    throw new Error(`ExpirationWarningTimeInDays is empty, zero or negative.`);
  }
  if (config.EthereumEndpoint && config.EthereumEndpoint !== '') {
    if (typeof config.MinStakingBlance != 'number') {
      throw new Error(`MinStakingBlance is not a number.`);
    }
    if (config.MinStakingBlance <= 0) {
      throw new Error(`MinStakingBlance is empty, zero or negative.`);
    }
    if (typeof config.MinBootstrapBlance != 'number') {
      throw new Error(`MinBootstrapBlance is not a number.`);
    }
    if (config.MinBootstrapBlance <= 0) {
      throw new Error(`MinBootstrapBlance is empty, zero or negative.`);
    }
    if (typeof config.MaxTimeSinceLastEvent != 'number') {
      throw new Error(`MaxTimeSinceLastEvent is not a number.`);
    }  
    if (config.MaxTimeSinceLastEvent <= 0) {
      throw new Error(`StakingAddress is empty, zero or negative.`);
    }
  }
}
