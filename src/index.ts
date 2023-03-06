/**
 * Copyright 2020 the orbs-network/status-page-v2 authors
 * This file is part of the orbs-network/status-page-v2 library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import {Configuration} from './config';
import express, {NextFunction, Request, Response} from 'express';
import {errorString} from './helpers';
import {TaskLoop} from './task-loop';
import * as Logger from './logger';
import {Processor} from './processor/main';
import * as path from 'path';
import {getNextUpdates, getRecovery, svcDataByNode} from './monitors/schedule'


// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import cors from "cors";

export function serve(config: Configuration) {
  const processor = new Processor(config);

  const app = express();

  app.set('json spaces', 2);

  // Serves static files for the client
  app.use(express.static(path.join(__dirname, './status-page-client/build')));

  // Serves index file of client
  app.get('/', (_, res) => {
    res.sendFile(path.join(__dirname, './status-page-client/build/index.html'));
  });

  app.get('/json', cors(), (_request, response) => {
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

  app.get('/posdatamatic', (_request, response) => {
    const body = processor.getModel();
    response.status(200).json(body.PoSDataMatic);
  });

  app.get('/exchanges/data', (_request, response) => {
    const body = processor.getModel();
    response.status(200).json(body.Exchanges.Upbit);
  });

  app.get('/exchanges/coinmarketcap', (_request, response) => {
    const body = processor.getModel();
    response.status(200).json(body.Exchanges.Coinmarketcap);
  });

  app.get('/eth_delegators', (_request, response) => {
    const body = processor.getModel();
    response.status(200).json(body.EthDelegators);
  });

  app.get('/matic_delegators', (_request, response) => {
    const body = processor.getModel();
    response.status(200).json(body.MaticDelegators);
  });

  /// schedule
  app.get('/schedule/recovery', getRecovery);
  app.get('/schedule/update',  getNextUpdates);
  app.get('/svc_data_by_node', svcDataByNode);

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

  const port = config.Port
  const server = app.listen(port, '0.0.0.0', () =>
    Logger.log(`Status service listening on port ${port}!`)
  );
  server.on('close', () => {
    processorTask.stop();
  });
  return server;
}
