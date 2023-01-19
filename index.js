import mongoose from "mongoose";
import express from "express";
import customerRoute from "./routes/customerRoute.js"
import cors from "cors"
import employeeRoute from "./routes/employeeRoute.js"

const port = process.env.PORT || 5000
const app = express()
app.use(cors())
app.use(express.json())

mongoose.set('strictQuery', false);
mongoose.connect(("mongodb://127.0.0.1:27017/Crm"),()=>{
    console.log("mongoose connected");
})

app.use("/",customerRoute.router)
app.use('/',employeeRoute.router)
app.get('/',(req,res)=>{
    createEmployee()
    res.send('hello world')
})

app.listen(5000,()=>{
    console.log(`server running on ${port}...`);
})