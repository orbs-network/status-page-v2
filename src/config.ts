export interface Configuration {
  Port: number;
  ProcessorPollTimeSeconds: number;
  NetworkType: NetworkType;
  RootNodeEndpoint: string;
  StaleStatusTimeSeconds: number;
  ExpirationWarningTimeInDays: number;
}

export enum NetworkType {
  Public = 'public',
  Private = 'private',
}

export const defaultConfiguration = {
  Port: 80,
  ProcessorPollTimeSeconds: 5 * 60,
  NetworkType: NetworkType.Public,
  RootNodeEndpoint: 'http://34.255.138.28',
  StaleStatusTimeSeconds: 15 * 60,
  ExpirationWarningTimeInDays: 30,
};

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
  if (!config.NetworkType) {
    throw new Error(`NetworkType is empty in config.`);
  }
  if (!config.RootNodeEndpoint) {
    throw new Error(`RootNodeEndpoint is empty in config.`);
  }
  if (!config.StaleStatusTimeSeconds) {
    throw new Error(`StaleStatusTimeSeconds is empty or zero.`);
  }
  if (typeof config.StaleStatusTimeSeconds != 'number') {
    throw new Error(`StaleStatusTimeSeconds is not a number.`);
  }
  if (!config.ExpirationWarningTimeInDays) {
    throw new Error(`ExpirationWarningTimeInDays is empty or zero.`);
  }
  if (typeof config.ExpirationWarningTimeInDays != 'number') {
    throw new Error(`ExpirationWarningTimeInDays is not a number.`);
  }
}
