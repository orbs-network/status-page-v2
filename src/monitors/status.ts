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
    ips: {[key: string]: boolean} = {};
    firstError: string = '';
    firstIp = '';
    firstName = '';
}

export function checkStatusChange(oldModel:Model, newModel: Model): string {
    const errorMap: ErrorMap = {};
    const errorCounterMap: ErrorCounterMap = {};
    _.forEach(newModel.VirtualChains, (v) => {errorCounterMap[toVCTag(v.Id)] = new ErrorAndCount()});
    _.forEach(newModel.Services, (v) => {errorCounterMap[toServiceTag(v.Name)] = new ErrorAndCount()});
    errorCounterMap[toReputationTag()] = new ErrorAndCount();

    _.forOwn(newModel.CommitteeNodes, (g, key) => guardianStatusChange(oldModel.CommitteeNodes[key], g, errorCounterMap));
    _.forOwn(newModel.StandByNodes, (g, key) => guardianStatusChange(oldModel.StandByNodes[key], g, errorCounterMap));

    _.forOwn(newModel.Statuses, (s, key) => {
        const oldStatus = oldModel.Statuses[key]?.Status || HealthLevel.Green;
        if (oldStatus === HealthLevel.Green && s.Status !== HealthLevel.Green) {
            errorMap[key] = s.StatusToolTip;
        }
    });

    return errorMapToString(errorMap, errorCounterMap);
}

function guardianStatusChange(oldModelGuardian:Guardian, newModelGuaridan:Guardian, errorMap: ErrorCounterMap) {
    _.forOwn(newModelGuaridan.NodeVirtualChains, (vc, vcid) => {
        singleStatusChange(newModelGuaridan.Name, newModelGuaridan.Ip, oldModelGuardian?.NodeVirtualChains[vcid]?.Status || HealthLevel.Green, vc.Status, vc.StatusToolTip, errorMap[toVCTag(vcid)]);
    });

    _.forOwn(newModelGuaridan.NodeServices, (service, name) => {
        singleStatusChange(newModelGuaridan.Name, newModelGuaridan.Ip, oldModelGuardian?.NodeServices[name]?.Status || HealthLevel.Green, service.Status, service.StatusToolTip, errorMap[toServiceTag(name)]);
    });

    singleStatusChange(newModelGuaridan.Name, newModelGuaridan.Ip, 
        oldModelGuardian?.NodeReputation?.ReputationStatus || HealthLevel.Green, 
        newModelGuaridan.NodeReputation.ReputationStatus, newModelGuaridan.NodeReputation.ReputationToolTip,
        errorMap[toReputationTag()]);
}

function singleStatusChange(name:string, ip:string, oldStatus: HealthLevel, newStatus: HealthLevel, newStatusMsg: string, error: ErrorAndCount) {
    if (oldStatus === HealthLevel.Green && newStatus !== HealthLevel.Green) {
        if (_.size(error.ips) === 0) {
            error.firstError = newStatusMsg;
            error.firstIp = ip;
            error.firstName = name;
        }
        error.ips[ip] = true;
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
        if (_.size(v.ips) === 1) {
            msg += `${k}: Node ${v.firstName} (${v.firstIp}): "${v.firstError}"\n`;
        } else if (_.size(v.ips) > 0) {
            msg += `${k}: ${_.size(v.ips)} nodes seem to have a problem, first node ${v.firstName} (${v.firstIp}): "${v.firstError}"\n`;
        };
    });
    return msg;
}
