/**
 * Copyright 2020 the orbs-network/status-page-v2 authors
 * This file is part of the orbs-network/status-page-v2 library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import _ from 'lodash';
import { Model } from "../model/model";
import { checkStatusChange } from './status';

export function healthCheck(newModel: Model, suppressMsgs: string[]) {
    let msg = '', healthMsg = '';
    if (_.size(newModel.CommitteeNodes) === 0) {
        healthMsg = `Network seems to be empty of *Committee Nodes* ...\n`;
    } else if (_.size(newModel.VirtualChains) === 0 ) {
        healthMsg = `Network seems to have *no Virtual-Chains* defined ...\n`;
    } else if (_.size(newModel.Services) === 0 ) {
        healthMsg = `Network nodes seem to have *no Services* defined ...\n`;
    } else  {
        msg = checkStatusChange(new Model(), newModel, suppressMsgs); // see if there are any non health statuses
        if (msg.length > 0) {
            healthMsg = `Network is not sunny ☔:\n${msg}`;
        } else {
            healthMsg = `Network is purring like a kitten :cat2:. All good ☀️!\n`
        }
    }
    return {msg, healthMsg};
}

