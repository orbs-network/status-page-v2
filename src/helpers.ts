/**
 * Copyright 2020 the orbs-network/status-page-v2 authors
 * This file is part of the orbs-network/status-page-v2 library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import _ from 'lodash';
import fetch from 'node-fetch';
import {retry} from 'ts-retry-promise';
import {tracker} from './processor/main';
import * as Logger from './logger';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function errorString(e: any) {
    return (e && e.stack) || '' + e;
}

export function toNumber(val: number | string) {
    if (typeof val == 'string') {
        return parseInt(val);
    } else return val;
}

export function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// returns UTC clock time in seconds (similar to unix timestamp / Ethereum block time / RefTime)
export function getCurrentClockTime() {
    return Math.round(new Date().getTime() / 1000);
}

export function isStaleTime(referenceTimeSeconds: number | string, differenceSeconds: number): boolean {
    const currentTime = getCurrentClockTime();
    if (_.isString(referenceTimeSeconds)) {
        referenceTimeSeconds = Math.round(new Date(referenceTimeSeconds).valueOf() / 1000);
    }
    return currentTime > referenceTimeSeconds + differenceSeconds;
}

export function timeAgoText(timeAgo: number | string): string {
    const currentTime = getCurrentClockTime();
    if (_.isString(timeAgo)) {
        timeAgo = Math.round(new Date(timeAgo).valueOf() / 1000);
    }
    const diff = currentTime - timeAgo;
    if (diff < 60) {
        return `${diff} seconds ago`;
    } else if (diff < 3600) {
        return `${Math.round(diff / 60)} minute(s) and ${diff % 60} seconds ago`;
    } else if (diff < 86400) {
        return `more than ${Math.round(diff / 3600)} hour(s) ago`
    } else {
        return `more than ${Math.round(diff / 86400)} day(s) ago`
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type JsonResponse = any;

export async function fetchJson(url: string): Promise<JsonResponse> {
    let attempt = 0;

    const check = tracker.shouldSkip(url);
    if (check.res) {
        Logger.log(`Skipping call for URL: ${url})`);
        throw check.err;
    }

    return retry(
        async () => {
            attempt++;

            let response = null;
            try {
                response = await fetch(url, {timeout: 10000}); // long response time for far east nodes
            } catch (e) {
                if (attempt == 3) {
                    tracker.recordAttempt(url, false, e);
                }
                throw e;
            }

            if (response.ok && String(response.headers.get('content-type')).toLowerCase().includes('application/json')) {
                try {
                    const res = await response.json();
                    if (res.error) {
                        throw new Error(`Invalid response (json contains error) for url '${url}`);
                    }

                    tracker.recordAttempt(url, true, null);
                    return res;
                } catch (e) {
                    throw new Error(`Invalid response (not json) for url '${url}`);
                }
            } else {
                const t = await response.text();
                const err = new Error(`Invalid response for url '${url}': Status Code: ${response.status}, Content-Type: ${response.headers.get('content-type')}, Content: ${t.length > 150 ? t.substring(0, 150) + '...' : t}`);
                tracker.recordAttempt(url, false, err);
                throw err;
            }
        },
        {retries: 2, delay: 300}
    );
}
