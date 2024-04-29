import mongoose from "mongoose";

    const schema = mongoose.Schema;
    const OFASchema = new schema({
        key: String,
        value: String
    },{timestamps: true})
    
    export const OFAModel = mongoose.model('OFA',OFASchema)