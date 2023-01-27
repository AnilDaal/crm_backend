import Employee from "../models/employeeModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

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
    const {name,email,phone,role,address,country,password} = req.body
    try {
        const hashPassword = await bcrypt.hash(password,10)
        const addEmp = await Employee.create({
            name,
            email,
            phone,
            role,
            address,
            country,
            password:hashPassword
        })
        // const employeeData = await employee.save()
        res.status(201).json(addEmp)
    } catch (error) {
        res.status(501).json({message:error})
    }
}

const getEmployee = async (req,res)=>{
    try {
        const getEmp = await Employee.find()
        res.status(201).json(getEmp)
    } catch (error) {
        res.status(502).json({message:error})
    }
}
const getSingleEmployee = async (req,res)=>{
    try {
        const employeeId = req.params.employeeId
        const getSingleEmp = await Employee.findById(employeeId)
        res.status(201).json(getSingleEmp)
    } catch (error) {
        res.status(501).json({message:error})
    }
}
const updateEmployee = async(req,res)=>{
    const {name,email,phone,role,address,country,password} = req.body
    try {
        const salt  = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,salt)
        const employeeId = req.params.employeeId
        const tempEmp = await Employee.findByIdAndUpdate(employeeId,{$set:{
            name,
            email,
            phone,
            role,
            address,
            country,
            password
        }},{new:true})
        const updateEmp = await Employee.findByIdAndUpdate(employeeId,{$set:{
            name,
            email,
            phone,
            role,
            address,
            country,
            password:hashPassword
        }},{new:true})
        res.status(201).json(tempEmp)
    } catch (error) {
     res.status(501).json({message:error});       
    }
}
const deleteEmployee = async(req,res)=>{
    try {
        const employeeId = req.params.employeeId
        const deleteEmp = await Employee.findByIdAndDelete(employeeId)
        res.status(201).json(deleteEmp)
    } catch (error) {
        res.status(501).json({message:error});
    }
}
// const singupEmployee = async (req,res)=>{
//     const {email,password,name,role,phone,address,country} = req.body
//     try {
//         const existedEmp = await Employee.findOne({email})
//         if(existedEmp){
//             return res.status(401).json({message:"all ready user existed"})
//         }
//     const salt  = await bcrypt.genSalt(10)
//     const passwordHash = await bcrypt.hash(password,salt)
//     const userData = await Employee.create({
//         name,
//         email,
//         phone,
//         role,
//         address,
//         country,
//         password:passwordHash
//     })
//     const token = await jwt.sign({email: userData.email ,id: userData._id},process.env.Secretkey)
//     res.status(201).json({token})
            
// } catch (error) {
//         res.status(501).json({message:error})
// }
// }
const loginEmployee = async (req,res)=>{
    const {email,password} = req.body
    try {
        const userData = await Employee.findOne({email})
        if(!userData)
        return res.status(404).json({message:"user and password wrong"})
        const hashPassword = await bcrypt.compare(password, userData.password)
        if(!hashPassword)
        return res.status(404).json({message:"user and password wrong"})
        
        // token generate
        const token = await jwt.sign({id:userData._id,user:userData},process.env.Secretkey,{
            expiresIn:'1d'
        })

        await userData.updateOne({
            tokens:tokens.concat(token)
        })

        res.cookie("CRM_Emp",token,{expires:new Date(Date.now()+1000*3600),httpOnly:true})
        res.status(201).send({token})
    } catch (error) {
        res.status(501).json({message:error})
    }
}

const logout = async(req,res)=>{
    try {
    req.employee.tokens = await req.employee.tokens.filter((elem)=>{
        return elem.token != req.employeeId
    })
    res.clearCookie("CRM_Emp")
    await req.employee.save()
} catch (error) {
        res.status(502).json({message:error})
}
}
export default {
    addEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee,
    getSingleEmployee,
    loginEmployee,
    logout
}