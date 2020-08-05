import { Configuration, NetworkType } from './config';

export const exampleConfig: Configuration = {
  Port: 80,
  ProcessorPollTimeSeconds: 5 * 60,
  NetworkType: NetworkType.Public,
  RootNodeEndpoint: 'http://34.255.138.28',
  StaleStatusTimeSeconds: 15*60,
  ExpirationWarningTimeInDays: 30,
};
