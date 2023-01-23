import Employee from "../models/employeeModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

// mail varify
// const mailvarify = async (email,name,userId)=>{
//     try {    
//     const transfer = nodemailer.createTransport({
//         host:'smtp.'
        // secure:false,
        // requireTLS:true,
        // auth:{
        //     user:'anildaal7@gmail.com',
        //     pass:'__'
        //     // port:587,
        // }
    // })
    //     const mailOption = {
//             from:'anildal7@gmail.com',
//             to:email,
//             subject:"for varification",
//             html:'<p> Hii '+name+', please check <a href="localhost/varify?id" '
//         }
//         transfer.sendMail(mailOption,(error,info)=>{
//             if(error)
//             console.log(error);
//             else
//             console.log(info.response);
//         })
//     } catch (error) {
//         console.log(error.message);
//     }
    
// }
// const varifymail = async (req,res)=>{
//     try {
//         const employeeId = req.params.employeeId
//         const varifydone = await Employee.findByIdAndUpdate(employeeId,{set:{isVarified:1}})


//     } catch (error) {
//         console.log(error.message);
//     }
// }
const addEmployee = async function(req,res){
    try {
        const spass = await bcrypt.hash(req.body.password,10)
        const employee = Employee.create({
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            role:req.body.role,
            password:spass
        })
        // const employeeData = await employee.save()
        res.send("done....")
    } catch (error) {
        console.log(error.message);
    }
}

const getEmployee = async (req,res)=>{
    try {
        const result = await Employee.find()
        res.json(result)
    } catch (error) {
        console.log(error.message);
    }
}
const getSingleEmployee = async (req,res)=>{
    try {
        const employeeId = req.params.employeeId
        const result = await Employee.findById(employeeId)
        res.json(result)
    } catch (error) {
        console.log(error.message);
    }
}
const updateEmployee = async(req,res)=>{
    try {
        const passwordHash = await bcrypt.hash(req.body.password,10)
        const employeeId = req.params.employeeId
        await Employee.findByIdAndUpdate(employeeId,{$set:{
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            role:req.body.role,
            password:passwordHash
        }},{new:true})
        res.send("update...")
    } catch (error) {
        console.log(error.message);       
    }
}
const deleteEmployee = async(req,res)=>{
    try {
        const employeeId = req.params.employeeId
        await Employee.findByIdAndDelete(employeeId)
        res.send("delete...")
    } catch (error) {
        console.log(error.message);
    }
}
const singupEmployee = async (req,res)=>{
    const {email,password,name,role,phone} = req.body
    try {
        const existedEmp = await Employee.findOne({email:email})
        if(existedEmp){
            return res.status(400).json({message:"all ready user existed"})
        }
    const passwordHash = await bcrypt.hash(password,10)
    const userData = await Employee.create({
        name:name,
        email:email,
        phone:phone,
        role:role,
        password:passwordHash
    })
    const token = jwt.sign({email: userData.email ,id: userData._id},process.env.Secretkey)
    res.status(201).json({user:userData,token:token})
            
} catch (error) {
        console.log(error.message);
        res.status(500).json({message:"somthing went wrong"})
}
}
const loginEmployee = async (req,res)=>{
    const {email,password} = req.body
    try {
        const userData = await Employee.findOne({email:email})
        if(!userData)
        res.status(404).json({message:"user and password wrong"})
        const pass = bcrypt.compare(password,userData.password)
        if(!pass)
        res.status(404).json({message:"user and password wrong"})
        const token = jwt.sign({email:userData.email,id:userData._id},process.env.Secretkey)
        res.status(200).json({user:userData,token:token})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:"something went wrong"})
    }
}
export default {
    addEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee,
    getSingleEmployee,
    loginEmployee,
    singupEmployee
}