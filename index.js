import mongoose from "mongoose";
import express from "express";
import customerRoute from "./routes/customerRoute.js"
import cors from "cors"
import employeeRoute from "./routes/employeeRoute.js"
import dotenv from "dotenv"
import adminRoute from "./routes/adminRoute.js"


const port = process.env.PORT || 5000
const app = express()
dotenv.config()
app.use(cors())
app.use(express.json())
app.use((req,res,next)=>{
    console.log("HTTP method-"+req.method+" URL-"+req.url);
    next()
})

mongoose.set('strictQuery', false);
mongoose.connect((process.env.Mongo_Data),()=>{
    console.log("mongoose connected");
})

app.use("/",employeeRoute.router)
app.use("/",adminRoute.router)
app.use("/",customerRoute.router)
app.get('/',(req,res)=>{
    res.send('hello world')
})

app.listen(port,()=>{
    console.log(`server running on ${port}...`);
})