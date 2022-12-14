
import fetch from 'node-fetch';
import {svcStatusDataByNode} from '../monitors/node-data'


// AbortController was added in node v14.17.0 globally
import AbortController from "abort-controller"
import { defaultConfiguration } from '../config.default';
import { generateNodeServiceUrlsRaw } from '../processor/url-generator'

////////////////////////////////////////////////
export async function fetchTimeout(url:string, ms:number) {
    const controller = new AbortController();
    const timeout = setTimeout(() => {
        controller.abort();
    }, ms);

    try {
        const response = await fetch(url, { signal: controller.signal });
        return await response.json();
    } catch (error) {
        console.log('request was aborted:', error);

    } finally {
        clearTimeout(timeout);
    }
    return null;
}
////////////////////////////////////////////////
async function checkNodeUpdate(url:string, node:any, res:Record<string, any>) {
    const status = await fetchTimeout(url, 5000)
    if (!status) return;

    // enum updater services
    const updater = status.Payload.CurrentImageVersionsUpdater;
    for (const name in updater.main) {
        const svc = updater.main[name];
        if (!res[name])
            res[name] = {};
        // pending version
        if (svc.PendingVersionTime > 0) {            
            const ver = `PENDING:${svc.PendingVersion}`;            
            // create array entry
            if (!res[name][ver])
                res[name][ver] = [];
            // push pending node
            const dt = new Date(svc.PendingVersionTime * 1000); 
            res[name][ver].push({                
                time: svc.PendingVersionTime,
                timeLocal: dt.toString(),
                timeUTC: "  " + dt.toUTCString(),
                nodeName: node.Name,
                nodeIp: node.Ip
            });
        }
        // current version
        else{
            const ver = `CURRENT:${status.Payload.CurrentImageVersions.main[name]}`;
            // create array entry            
            if (!res[name][ver])
                res[name][ver] = [];
            // push pending node
            res[name][ver].push({                            
                nodeName: node.Name,
                nodeIp: node.Ip
            });
        }
    }
}

////////////////////////////////////////////////
export async function getNextUpdates(_req:any, response:any) {
    const status = await fetchTimeout(defaultConfiguration.xCoreUrl, 2000);
    if (!status) return;
    const res:Record<string, any> = {};
    const checkNodes = [];
    for (const node of status.Payload.CurrentTopology) {
        // status url of a service
        const url = generateNodeServiceUrlsRaw(node.Ip, "management-service").Status;
        try {
            checkNodes.push(checkNodeUpdate(url, node, res));
        } catch (e) {
            console.error(e)
        }
    }
    console.log(`getNextUpdates call all nodes:`)
    await Promise.all(checkNodes);
    console.log(`getNextUpdates DONE!`)

    for (const svc in res) {
        for (const update in res[svc]) {
            const list = res[svc][update];
            // sort
            if (list.length > 0 && list[0].time) {
                // console.log("-----------------------------")
                // console.log('sorting', list)
                list.sort((a:any, b:any) => {
                    if (a.time > b.time)
                        return 1;
                    if (a.time < b.time)
                        return -1;

                    return 0;
                });
            }
        };
    }
    response.status(200).json(res);
}
////////////////////////////////////////////////
async function checkRecovery(url:string, node:any, res:any) {
    const status = await fetchTimeout(url, 2000)
    if (!status) return;

    // enum updater services
    const recovery = status.Payload.Recovery;
    if (!recovery) return;
    // last tick
    if(recovery?.lastTick){
        const dt = new Date(recovery.lastTick)
        // add 6h
        const numOfHours = 6;
        dt.setTime(dt.getTime() + numOfHours * 60 * 60 * 1000);
        res.push({ nodeName: node.Name, time: dt })
    }
    else {
        res.push({ nodeName: node.Name, error: "recovery info not found" });
    }

    
}

////////////////////////////////////////////////
export async function getRecovery(_req:any, response:any) {    
    const status = await fetchTimeout(defaultConfiguration.xCoreUrl, 2000);
    if (!status) return;
    const res:Array<any> = [];
    const checkNodes = [];
    for (const node of status.Payload.CurrentTopology) {
        // status url of a service
        const url = generateNodeServiceUrlsRaw(node.Ip, "boyar").Status;
        try {
            checkNodes.push(checkRecovery(url, node, res));            
        } catch (e) {
            console.error(e)
        }
    }
    console.log(`call all recovery nodes:`)
    await Promise.all(checkNodes);
    console.log(`DONE!`)

    res.sort((a, b) => {
        if (a.time > b.time)
            return 1;
        if (a.time < b.time)
            return -1;

        return 0;
    })
    response.status(200).json(res);
}

////////////////////////////////////////////////
export async function svcDataByNode(req:any, res:any) {
    if(!req.query.service || ! req.query.columns){
        res.status(422).send({
          message: 'service or columns are missing '
       });
       return; 
      }
      const cs = req.query.columns as string;
      
      try{
        const columns = cs.indexOf(',')>1 ? cs.split(','):[cs];      
        await svcStatusDataByNode( req.query.service as string, columns, res);            
      }
      catch(e){
        res.status(400).send({
          message:e
       });
      }
}
