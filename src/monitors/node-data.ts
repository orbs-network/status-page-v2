import { defaultConfiguration } from '../config.default';
import {fetchTimeout} from './schedule';
import { generateNodeServiceUrlsRaw } from '../processor/url-generator'
////////////////////////////////////////////////
async function checkServiceColumns(url:string, node:any, columns:Array<string>, res:Array<Array<string>>) {
    const jsn = await fetchTimeout(url, 2000)
    if (!jsn) return;

    // get values into array
    const vals = [];
    for (const c of columns) {
        try {
            vals.push(c.split('.').reduce((o, i) => o[i], jsn));
        }catch(e){
            console.error(`Error: Cant map value from column [${c}] `, e);
        }
    }
    // add line to csv
    res.push([node.Name].concat(vals));
}
////////////////////////////////////////////////
export async function svcStatusDataByNode(service:string, columns:Array<string>, response:any) {
    const status = await fetchTimeout(defaultConfiguration.xCoreUrl, 2000);
    if (!status) return;

    // csv header
    const tailColumns:Array<string> = [];
    for (const a of columns) {
        try {
            const tail = a.substring(a.lastIndexOf('.') + 1);        
            tailColumns.push(tail);
        }catch(e){
            console.error(`Error: Cant get tail of column [${a}] `, e);
        }
    }
    const res:Array<Array<string>> = [];
    res.push(["Node Name"].concat(tailColumns));
    console.log('HEADER-----------------------------------')
    console.log(res);    
    const checkNodes = [];
    for (const node of status.Payload.CurrentTopology) {
        // status url of a service
        const url = generateNodeServiceUrlsRaw(node.Ip, service).Status;
        try {
            checkNodes.push(checkServiceColumns(url, node, columns, res));
        } catch (e) {
            console.error(e)
        }
    }

    console.log(`aggregate call all nodes:`)
    await Promise.all(checkNodes);
    console.log(`DONE!`)

    const lineArray:Array<string> = [];
    res.forEach(function (infoArray, _) {
        const line = infoArray.join(",");
        lineArray.push(line);
    });
    const csvContent = lineArray.join("\n");
    console.log(csvContent);
    response.status(200).type('text/csv').send(csvContent)
}