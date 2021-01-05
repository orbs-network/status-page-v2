/**
 * Copyright 2020 the orbs-network/status-page-v2 authors
 * This file is part of the orbs-network/status-page-v2 library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import _ from 'lodash';
import { WebClient } from '@slack/web-api';
import { Configuration } from '../config';
import { Model } from '../model/model';
import { healthCheck } from './healthcheck';
import { checkStatusChange } from './status';

export class Monitors {  
    private msg = '';

    constructor(private config: Configuration) {}
  
    async run(oldModel:Model, newModel: Model) {
        if(this.config.SlackToken && this.config.SlackToken.length > 0) {
            if (oldModel.TimeSeconds <= 0) { // (re)start
                const {msg, healthMsg} = healthCheck(newModel, this.config.SlackSuppressMsgs);
                this.msg = msg;
                this.sendSlack(`Health Check: ${healthMsg}`, this.config);
            } else {
                const msg = checkStatusChange(oldModel, newModel, this.config.SlackSuppressMsgs);
                if (msg.length > 0) {
                    if (this.msg !== msg) {
                        this.msg = msg;
                        this.sendSlack(`Network News: the following *new issue(s)* are making it rain ☔:\n${msg}`, this.config);
                    }
                }
            }
        }
    }

    readonly slackUserName = 'StatusPageMonitor';
    readonly slackUserEmoji = ':desktop_computer:';
    private async sendSlack(message: string, config:Configuration) {
      const slack = new WebClient(config.SlackToken);
      await slack.chat.postMessage({text : message, username: this.slackUserName, icon_emoji: this.slackUserEmoji, channel: config.SlackChannel});
    }
}
