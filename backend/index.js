import express from "express";
import 'dotenv/config'
import mongoose from "mongoose";

const app = express();


mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log(`MongoDb connection established...`);
    app.listen(process.env.PORT,()=>{
        console.log(`server listening on port ${process.env.PORT}`);
    })
})
.catch((error)=>{
    console.log(`Db connection failed: ${error}`);
})