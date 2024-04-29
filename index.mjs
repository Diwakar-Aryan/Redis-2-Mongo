import { createClient } from "@redis/client";
import {OFAModel} from "./mongoSchema.mjs";
import getConnection from "./mongooseConnection.mjs";
import { RedisUrl } from "./config";

console.log('Migration Started')

try {
    const client = await createClient({url: RedisUrl()}).on('error', err => console.log('Redis Client Error', err)).connect();
    let cursor  = 0;
    const count = process.env.COUNT
    getConnection();

    do {
        // let data = await client.scan(cursor);
        let data = await client.scan(cursor, {'COUNT': 1000});
        let dataVal = await client.mGet(data.keys);
        const insertData = [];
        for(let i = 0;i<data.keys.length;i++){
            const obj ={
                "insertOne":{
                    "document":{
                        "key": data.keys[i],
                        "value": dataVal[i]
                    }
                }
            }
            insertData.push(obj);
        }
        const returnStatus = await OFAModel.bulkWrite(insertData);
        cursor = data.cursor
        console.log(`------- Inserted Count: ${returnStatus.insertedCount}---------- Cursor: ${cursor} -----`);
        
    } while (cursor != 0 );
} catch (error) {
    console.error(error)
    process.exit()
}
console.log('Migration Completed')
process.exit();