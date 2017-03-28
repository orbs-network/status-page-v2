import fetch from 'node-fetch';
import { retry } from 'ts-retry-promise';

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type JsonResponse = any;

export async function fetchJson(url: string) {
  return await retry(
    async () => {
      const response = await fetch(url);
      const body = await response.text();
      try {
        return JSON.parse(body);
      } catch (e) {
        throw new Error(`Invalid response:\n${body}.`);
      }
    },
    { retries: 3, delay: 300 }
  );
}