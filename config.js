import 'dotenv/config'

export function RedisUrl() {
    if(process.env.ENV === 'dev') {
        return process.env.REDIS
    } else if(process.env.ENV === 'production'){
        //
    }
}

export function MongoUrl() {
    if(process.env.ENV === 'dev') {
        return process.env.MONGO_URI
    } else if(process.env.ENV === 'production'){
        //
    }
}