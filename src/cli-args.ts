/**
 * Copyright 2020 the orbs-network/status-page-v2 authors
 * This file is part of the orbs-network/status-page-v2 library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import yargs from 'yargs';
import * as Logger from './logger';
import { readFileSync } from 'fs';
import { Configuration, validateConfiguration } from './config';
import { defaultConfiguration } from './config.default';

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
