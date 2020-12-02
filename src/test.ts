import _ from 'lodash';

import dotenv from 'dotenv';
import { getResources, getWeb3 } from './processor/eth-helper';
import {getPoSStatus } from './processor/stats';
import { fetchJson } from './helpers';
import { testModel } from './test.model';

dotenv.config();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function toConsole(x:any){ return JSON.stringify(x, null, 2)}

async function x() {
    const ethereumEndpoint = String(process.env.ETHEREUM_ENDPOINT);
    const nodeEndpoints = [
        'https://0xcore.orbs.com/services/management-service/status',  // for actual production front-end with https
        'http://0xaudit.orbs.com/services/management-service/status', // for dev non https
        'http://34.227.204.75/services/management-service/status',  // for dev non https
    ];

    const s = Date.now()

    const web3 = getWeb3(ethereumEndpoint);
    const rootNodeData = await fetchJson(nodeEndpoints[2]);

    //console.log(toConsole(overview));
    const resources = await getResources(rootNodeData, web3);

    const r = await getPoSStatus(testModel, resources, web3);
    console.log(toConsole(r));

    console.log(`took ${(Date.now() - s) / 1000.0} seconds`)
}

x().then(()=> process.exit(0)).catch(e => console.log(`${e.stack}`));
