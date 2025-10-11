import mongoose from "mongoose";
import config from "../config/index.js";

export const ConnectDb = async ()=>{
    try{
        await mongoose.connect(config.Mongo_URI);
        console.log("mongoDb connected successfully")
    }catch(err){
        console.log("error while connecting mongoDb", err)
        process.exit(1)
    }
}