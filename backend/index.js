import express from "express";
import 'dotenv/config'
import mongoose from "mongoose";
import cors from 'cors'
import booksRoute from "./routes/booksRoute.js"
const app = express();
app.use(express.json())

app.use(cors({
    origin:'http://localhost:3000',
    methods:['GET','POST','PUT','DELETE'],
    allowedHeaders:['Content-Type']
}))

app.get('/',(req,res)=>{
    console.log(req);
    return res
    .status(234)
    .send("book store");
})

app.use("/books",booksRoute)

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