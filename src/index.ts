import { Configuration } from './config';
import express, { Request, Response, NextFunction } from 'express';
import { errorString } from './helpers';
import { TaskLoop } from './task-loop';
import * as Logger from './logger';
import { Processor } from './model/processor';

export function serve(config: Configuration) {
  const processor = new Processor(config);

  const app = express();
  app.set('json spaces', 2);

  app.get('/json', (_request, response) => {
    const body = processor.getModel();
    response.status(200).json(body);
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

  const server = app.listen(config.Port, '0.0.0.0', () =>
    Logger.log(`Status service listening on port ${config.Port}!`)
  );
  server.on('close', () => {
    processorTask.stop();
  });
  return server;
}
