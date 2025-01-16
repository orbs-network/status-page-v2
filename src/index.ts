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
import {getNextUpdates, getRecovery} from './monitors/schedule'
import {svcStatusDataByNode} from './monitors/node-data'
import cloneDeep from 'lodash/cloneDeep';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import cors from "cors";
import {Guardian, HealthLevel} from "./model/model";

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

    const model = processor.getModel();

    const body = cloneDeep( model);

    removeVMStatusJson(body.CommitteeNodes);
    removeVMStatusJson(body.StandByNodes);
    removeVMStatusJson(body.AllRegisteredNodes);

    if (config.PatchZeus) {
      for (const node of Object.values(body.AllRegisteredNodes)) {
        if (node.Name === 'Zeus') {
          node.NodeServices['Controller'].Status = HealthLevel.Blue;
          node.NodeServices['Controller'].StatusToolTip = Date.now() / 1000 + 60 * 60 * 2;
        }
      }

      for (const node of Object.values(body.StandByNodes)) {
        if (node.Name === 'Zeus') {
          node.NodeServices['Controller'].Status = HealthLevel.Blue;
          node.NodeServices['Controller'].StatusToolTip = Date.now() / 1000 + 60 * 60 * 2;
        }
      }
    }

    response.status(200).json(body);
  });

  app.get('/json-full', cors(), (_request, response) => {

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

  // ServicedataByNode
  app.get('/svc_data_by_node', (req, res) => {
    if(!req.query.service || ! req.query.columns){
      res.status(422).send({
        message: 'service or columns are missing '
     });
     return;
    }
    const cs = req.query.columns as string;
    const columns = cs.indexOf(',')>1 ? cs.split(','):[cs];
    try{
      svcStatusDataByNode( req.query.service as string, columns, res);
    }
    catch(e){
      res.status(400).send({
        message:e
     });
    }
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

  const port = config.Port
  const server = app.listen(port, '0.0.0.0', () =>
    Logger.log(`Status service listening on port ${port}!`)
  );
  server.on('close', () => {
    processorTask.stop();
  });
  return server;
}

/**
 * removes the VMStatusJson object from nodes status to reduce the size of status json for orbs status page
 *
 * @param nodes
 */
function removeVMStatusJson(nodes: { [p: string]: Guardian }) {

  for (const node of Object.values(nodes)) {

    for (const service of Object.values(node.NodeServices)) {

      delete service.VMStatusJson;
      service.StatusToolTip = truncateWithEllipsis(service.StatusToolTip, 250);

    }

  }
}

function truncateWithEllipsis(str:string, maxLength:number) {
  return str.length > maxLength ? str.substring(0, maxLength - 3) + '...' : str;
}
