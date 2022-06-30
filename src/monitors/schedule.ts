
import fetch from 'node-fetch';

// AbortController was added in node v14.17.0 globally
//const AbortController = globalThis.AbortController || await import('abort-controller')
import AbortController from "abort-controller"
const xCoreUrl = "http://18.211.83.127/services/management-service/status" ;


////////////////////////////////////////////////
async function fetchTimeout(url:string, ms:number) {
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
    const status = await fetchTimeout(url, 2000)
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
            res[name][ver].push({                
                time: svc.PendingVersionTime,
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
// function printUpdate(name, list) {
//     console.log(`update ${name} ----------------------------`)
//     list.sort((a, b) => {
//         if (a.time > b.time)
//             return 1;
//         if (a.time < b.time)
//             return -1;

//         return 0;
//     })
//     for (const item of list) {
//         //console.log(item)
//         if (item.time > 0) {
//             const timeDiff = (item.time * 1000) - Date.now()
//             let h = (new Date(timeDiff)).getHours();
//             let m = (new Date(timeDiff)).getMinutes();

//             h = (h < 10) ? '0' + h : h;
//             m = (m < 10) ? '0' + m : m;

//             const output = h + ':' + m;
//             const tm = new Date(item.time * 1000)
//             console.log(`pending in ${output} hours\t| on ${tm.toString()}\t${item.nodeName} `)
//         } else {
//             console.log(`updated to date\t${item.nodeName}`)

//         }
//     }

// }
////////////////////////////////////////////////
export async function getNextUpdates(_req:any, response:any) {
    const status = await fetchTimeout(xCoreUrl, 2000);
    if (!status) return;
    const res:Record<string, any> = {};
    const checkNodes = [];
    for (const node of status.Payload.CurrentTopology) {
        const url = `http://${node.Ip}/services/management-service/status`;
        try {
            checkNodes.push(checkNodeUpdate(url, node, res));
        } catch (e) {
            console.error(e)
        }
    }
    console.log(`getNextUpdates call all nodes:`)
    await Promise.all(checkNodes);
    console.log(`getNextUpdates DONE!`)

    for (const update in res) {
        const list = res[update];
        // sort
        if (list.length > 0) {
            list.sort((a:any, b:any) => {
                if (a.time > b.time)
                    return 1;
                if (a.time < b.time)
                    return -1;

                return 0;
            });
        }
    };
    response.status(200).json(res);
}
////////////////////////////////////////////////
async function checkRecovery(url:string, node:any, res:any) {
    const status = await fetchTimeout(url, 2000)
    if (!status) return;

    // enum updater services
    const recovery = status.Payload.Recovery;
    // last tick
    const dt = new Date(recovery.lastTick)
    // add 6h
    const numOfHours = 6;
    dt.setTime(dt.getTime() + numOfHours * 60 * 60 * 1000);

    res.push({ nodeName: node.Name, time: dt })
}

////////////////////////////////////////////////
export async function getRecovery(_req:any, response:any) {    
    const status = await fetchTimeout(xCoreUrl, 2000);
    if (!status) return;
    const res:Array<any> = [];
    const checkNodes = [];
    for (const node of status.Payload.CurrentTopology) {
        let url = `http://${node.Ip}/services/boyar/status`;
        if (node.Name.indexOf("okx") > -1) {
            url = `http://${node.Ip}:18888/services/boyar/status`;
        }
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