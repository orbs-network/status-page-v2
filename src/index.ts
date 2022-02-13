/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-misused-promises */
/**
 * Copyright 2020 the orbs-network/status-page-v2 authors
 * This file is part of the orbs-network/status-page-v2 library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */
import fetch from 'node-fetch';

import { Configuration } from './config';
import express, { Request, Response, NextFunction } from 'express';
import { errorString } from './helpers';
import { TaskLoop } from './task-loop';
import * as Logger from './logger';
import { Processor } from './processor/main';
import * as path from 'path';
const cors = require('cors');

export function serve(config: Configuration) {
  const processor = new Processor(config);

  const app = express();
  app.set('json spaces', 2);

  // Serves static files for the client
  app.use(express.static(path.join(__dirname, './status-page-client/build')));
  app.use(cors());
  // Serves index file of client
  app.get('/', (_, res) => {
    res.sendFile(path.join(__dirname, './status-page-client/build/index.html'));
  });

  app.get('/json', (_request, response) => {
    const body = processor.getModel();
    response.status(200).json(body);
  });

  app.get('/supply', (_request, response) => {
    const body = processor.getModel();
    response.status(200).json(body.SupplyData);
  });

  app.get('/posdata', (_request, response) => {
    const body = processor.getModel();
    response.status(200).json(body.PoSData);
  });
  app.get('/maitenance', async (_request, response) => {
    const settings = { method: 'Get' };

    const res = await fetch(config.MaitenanceStatusUrl, settings);
    const result = await res.json();
    response.status(200).json(result);
  });

  app.get('/exchanges/data', (_request, response) => {
    const body = processor.getModel();
    response.status(200).json(body.Exchanges.Upbit);
  });

  app.get('/exchanges/coinmarketcap', (_request, response) => {
    const body = processor.getModel();
    response.status(200).json(body.Exchanges.Coinmarketcap);
  });

  app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof Error) {
      Logger.error(`Error response to ${req.url}: ${errorString(error)}.`);
      return res.status(500).json({
        status: 'error',
        error: errorString(error),
      });
    }
    return next(error);
  });

  const processorTask = new TaskLoop(() => processor.run(), config.ProcessorPollTimeSeconds * 1000);
  processorTask.start();

  const port = config.Port;
  const server = app.listen(port, '0.0.0.0', () => Logger.log(`Status service listening on port ${port}!`));
  server.on('close', () => {
    processorTask.stop();
  });
  return server;
}
