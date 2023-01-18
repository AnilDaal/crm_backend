import mongoose from "mongoose";
import express from "express";
import customerRoute from "./routes/customerRoute.js"

const app = express()
// app.use(express.json())
mongoose.set('strictQuery', false);
mongoose.connect(("mongodb://127.0.0.1:27017/Crm"),()=>{
    console.log("mongoose connected");
})
app.use("/",customerRoute.router)

app.get('/',(req,res)=>{
    createEmployee()
    res.send('hello world')
})

app.listen(5000,()=>{
    console.log("server running...");
})