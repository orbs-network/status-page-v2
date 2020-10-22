/**
 * Copyright 2020 the orbs-network/status-page-v2 authors
 * This file is part of the orbs-network/status-page-v2 library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import _ from 'lodash';
import { Guardian, HealthLevel, Model } from "../model/model";

interface ErrorMap { // Network level errors
    [key: string]: string;
}

interface ErrorCounterMap { // counter for each type of error for all nodes.
    [key: string]: ErrorAndCount;
}
class ErrorAndCount {
    count: number = 0;
    firstError: string = '';
}

export function checkStatusChange(oldModel:Model, newModel: Model): string {
    const errorMap: ErrorMap = {};
    const errorCounterMap: ErrorCounterMap = {};
    _.forEach(newModel.VirtualChains, (v) => {errorCounterMap[toVCTag(v.Id)] = new ErrorAndCount()});
    _.forEach(newModel.Services, (v) => {errorCounterMap[toServiceTag(v.Name)] = new ErrorAndCount()});
    errorCounterMap[toReputationTag()] = new ErrorAndCount();

    _.forOwn(newModel.CommitteeNodes, (g, key) => guardianStatusChange(oldModel.CommitteeNodes[key], g, errorCounterMap));
    _.forOwn(newModel.StandByNodes, (g, key) => guardianStatusChange(oldModel.StandByNodes[key], g, errorCounterMap));

    const oldEthStatus = oldModel?.EthereumStatus?.Status || HealthLevel.Green;
    if (oldEthStatus === HealthLevel.Green && newModel?.EthereumStatus?.Status !== HealthLevel.Green) {
        errorMap['PoS Contracts Health'] = newModel?.EthereumStatus?.StatusToolTip || 'Unknown';
    }

    return errorMapToString(errorMap, errorCounterMap);
}

function guardianStatusChange(oldModelGuardian:Guardian, newModelGuaridan:Guardian, errorMap: ErrorCounterMap) {
    _.forOwn(newModelGuaridan.NodeVirtualChains, (vc, vcid) => {
        singleStatusChange(oldModelGuardian?.NodeVirtualChains[vcid]?.Status || HealthLevel.Green, vc.Status, vc.StatusToolTip, errorMap[toVCTag(vcid)]);
    });

    _.forOwn(newModelGuaridan.NodeServices, (service, name) => {
        singleStatusChange(oldModelGuardian?.NodeServices[name]?.Status || HealthLevel.Green, service.Status, service.StatusToolTip, errorMap[toServiceTag(name)]);
    });

    singleStatusChange(
        oldModelGuardian?.NodeReputation?.ReputationStatus || HealthLevel.Green, 
        newModelGuaridan.NodeReputation.ReputationStatus, newModelGuaridan.NodeReputation.ReputationToolTip,
        errorMap[toReputationTag()]);
}

function singleStatusChange(oldStatus: HealthLevel, newStatus: HealthLevel, newStatusMsg: string, error: ErrorAndCount) {
    if (oldStatus === HealthLevel.Green && newStatus !== HealthLevel.Green) {
        if (error.count === 0) {
            error.firstError = newStatusMsg;
        }
        error.count = error.count + 1;
    }
} 

function toVCTag(s: string): string {
    return 'VC ' + s;
}

function toServiceTag(s: string): string {
    return 'Service ' + s;
}

function toReputationTag(): string {
    return 'Reputation';
}

function errorMapToString(errorMap: ErrorMap, errorCounterMap: ErrorCounterMap): string {
    let msg = '';
    _.forOwn(errorMap, (v, k) => {
        msg += `${k}: new problematic status message: "${v}"\n`;
    });

    _.forOwn(errorCounterMap, (v, k) => {
        if (v.count > 0) {
            msg += `${k}: ${v.count} nodes seem to have a problem, first issue "${v.firstError}"\n`;
        };
    });
    return msg;
}
