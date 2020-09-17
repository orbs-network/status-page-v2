import { Configuration } from './config';
import express, { Request, Response, NextFunction } from 'express';
import { errorString } from './helpers';
import { TaskLoop } from './task-loop';
import * as Logger from './logger';
import { Processor } from './model/processor';
import * as path from 'path';

export function serve(config: Configuration) {
  const processor = new Processor(config);

  const app = express();
  app.set('json spaces', 2);

  // Serves static files for the client
  app.use(express.static(path.join(__dirname, '../src/status-page-client/build')));

  // Serves index file of client
  app.get('/', (_,res) => {
    res.sendFile(path.join(__dirname, '../src/status-page-client/build/index.html'));
  });

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

  const port = process.env.PORT ? parseInt(process.env.PORT) : config.Port
  const server = app.listen(port, '0.0.0.0', () =>
    Logger.log(`Status service listening on port ${port}!`)
  );
  server.on('close', () => {
    processorTask.stop();
  });
  return server;
}
