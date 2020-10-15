/**
 * Copyright 2020 the orbs-network/status-page-v2 authors
 * This file is part of the orbs-network/status-page-v2 library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import { serve } from '.';
import { parseArgs } from './cli-args';
import * as Logger from './logger';

process.on('uncaughtException', function (err) {
  Logger.log('Uncaught exception on process, shutting down:');
  Logger.error(err.stack);
  process.exit(1);
});

try {
  Logger.log('Status service started.');
  const config = parseArgs(process.argv);
  Logger.log(`Input config: '${JSON.stringify(config)}'.`);
  const server = serve(config);

  process.on('SIGINT', function () {
    Logger.log('Received SIGINT, shutting down.');
    if (server) {
      server.close(function (err) {
        if (err) {
          Logger.error(err.stack || err.toString());
        }
        process.exit();
      });
    }
  });
} catch (err) {
  Logger.log('Exception thrown from main, shutting down:');
  Logger.error(err.stack);
  process.exit(128);
}
