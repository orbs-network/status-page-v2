export interface Configuration {
  Port: number;
  ProcessorPollTimeSeconds: number;
  NetworkType: 'public' | 'private';
  RootNodeEndpoint: string;
}

export const defaultConfiguration = {
  Port: 80,
  ProcessorPollTimeSeconds: 5 * 50,
  NetworkType: 'public',
  RootNodeEndpoint: 'http://34.255.138.28',
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
}
