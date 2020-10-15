/**
 * Copyright 2020 the orbs-network/status-page-v2 authors
 * This file is part of the orbs-network/status-page-v2 library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import _ from 'lodash';
import { Configuration } from '../config';
import { Model } from "../model/model";
import { checkStatusChange } from './status';

export function healthCheck(oldModel:Model, newModel: Model, config: Configuration): string {
    if (oldModel.TimeSeconds === 0){
        return `Health Check: Status-Page-v2 just started runnig ...\n`;
    } else if (_.size(newModel.CommitteeNodes) === 0) {
        return `Health Check: Network seems to be empty of Committee Nodes ...\n`;
    } else if (_.size(newModel.VirtualChains) === 0 ) {
        return `Health Check: Network seems to have no Virtual-Chains defined ...\n`;
    } else if (_.size(newModel.Services) === 0 ) {
        return `Health Check: Network nodes seem to have no Services defined ...\n`;
    } else if (timeForMorningMessage(oldModel.TimeSeconds, newModel.TimeSeconds, config.HealthCheckTimeOfDayInSeconds)) {
        const msg = checkStatusChange(new Model(), newModel); // see if there are any non health statuses
        if (msg.length > 0) {
            return msg;
        } else {
            return `Hello! its ${new Date().toUTCString()} and the network is purring like a kitten. All good!\n`
        }
    }
    return '';
}

function timeForMorningMessage(time0: number, time1: number, secondInDay:number): boolean {
    return toSecondOfDay(time0) <= secondInDay && toSecondOfDay(time1) >= secondInDay;
}

function toSecondOfDay(time: number) {
    const date = new Date(time * 1000);
    return date.getUTCHours() * 3600 + date.getUTCMinutes() * 60 + date.getUTCSeconds();
}