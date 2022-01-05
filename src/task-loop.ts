/**
 * Copyright 2020 the orbs-network/status-page-v2 authors
 * This file is part of the orbs-network/status-page-v2 library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import * as Logger from './logger';
import { errorString } from './helpers';

export class TaskLoop {
  private handle: NodeJS.Timeout | undefined;
  private started = false;
  constructor(private task: () => Promise<unknown>, private pause: number) { }

  runTask = () => {
    this.task().then(
      () => {
        if (this.started) {
          this.handle = setTimeout(this.runTask, this.pause);
        }
      },
      (err) => {
        Logger.error(`Error in runTask: ${errorString(err)}.`);
        if (this.started) {
          this.handle = setTimeout(this.runTask, this.pause);
        }
      }
    );
  };

  start = () => {
    if (!this.started) {
      this.started = true;
      this.handle = setTimeout(this.runTask, 0);
    }
  };

  stop = () => {
    this.started = false;
    if (this.handle !== undefined) {
      clearTimeout(this.handle);
    }
  };
}
