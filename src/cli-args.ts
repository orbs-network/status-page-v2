import { Configuration, validateConfiguration, defaultConfiguration } from './config';
import yargs from 'yargs';
import { readFileSync } from 'fs';
import * as Logger from './logger';

export function parseArgs(argv: string[]): Configuration {
  let res: Configuration;

  // parse command line args
  const args = yargs(argv)
    .option('config', {
      type: 'array',
      required: false,
      string: true,
      default: [],
      description: 'list of config files',
    })
    .exitProcess(false)
    .parse();

  // read input config JSON files
  try {
    res = Object.assign(
      {},
      defaultConfiguration,
      ...args.config.map((configPath) => JSON.parse(readFileSync(configPath).toString()))
    );
  } catch (err) {
    Logger.error(`Cannot parse input JSON config files: [${args.config}].`);
    throw err;
  }

  // validate JSON config
  try {
    validateConfiguration(res);
  } catch (err) {
    Logger.error(`Invalid JSON config: '${JSON.stringify(res)}'.`);
    throw err;
  }

  return res;
}
