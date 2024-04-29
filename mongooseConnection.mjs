import mongoose from 'mongoose';
import { MongoUrl } from './config';

export default async function getConnection(){
    mongoose.connect(MongoUrl).then(()=>console.log('Mongo DB Connected'))
}