/**
 * Copyright 2020 the orbs-network/status-page-v2 authors
 * This file is part of the orbs-network/status-page-v2 library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import _ from 'lodash';
import fetch from 'node-fetch';
import { WebClient } from '@slack/web-api';
import { Configuration } from '../config';
import { Model } from '../model/model';
import { healthCheck } from './healthcheck';
import { checkStatusChange } from './status';

export class Monitors {  
    private msg = '';

    constructor(private config: Configuration) {}
  
    async run(oldModel:Model, newModel: Model) {
        if(this.isMoninotorEnabled()) {
            if (oldModel.TimeSeconds <= 0) { // (re)start
                const {msg, healthMsg} = healthCheck(newModel, this.config.MonitorSuppressMsgs);
                this.msg = msg;
                this.sendMessage(`Health Check: ${healthMsg}`);
            } else {
                const msg = checkStatusChange(oldModel, newModel, this.config.MonitorSuppressMsgs);
                if (msg.length > 0) {
                    if (this.msg !== msg) {
                        this.msg = msg;
                        this.sendMessage(`Network News: the following *new issue(s)* are making it rain ☔:\n${msg}`);
                    }
                }
            }
        }
    }

    readonly messagerUserName = 'StatusPageMonitor';
    readonly slackUserEmoji = ':desktop_computer:';
    private async sendMessage(message: string) {
        if (this.config.MonitorSlackToken && this.config.MonitorSlackToken.length > 0) {
            const slack = new WebClient(this.config.MonitorSlackToken);
            await slack.chat.postMessage({text : message, username: this.messagerUserName, icon_emoji: this.slackUserEmoji, channel: this.config.MonitorSlackChannel});
        }
        if (this.config.MonitorDiscordURL && this.config.MonitorDiscordURL.length > 0) {
            await fetch(this.config.MonitorDiscordURL,
                {
                  method: 'post',
                  body:    JSON.stringify({
                      "username": this.messagerUserName,
                      "content": message
                  }),
                  headers: { 'Content-Type': 'application/json' },
                });
        }
    }

    private isMoninotorEnabled() {
        return this.config.MonitorSlackToken && this.config.MonitorSlackToken.length > 0 && this.config.MonitorDiscordURL && this.config.MonitorDiscordURL.length > 0
    }
}
