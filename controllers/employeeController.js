import Employee from "../models/employeeModel.js"
import bcrypt from "bcrypt"
import nodemailer from "nodemailer"

const PasswordHash = async(password)=>{
    try {
        const passwordHash = await bcrypt.hash(password,10)
        return passwordHash
    } catch (error) {
        console.log(error.message);
    }
}
const addEmployee = async function(req,res){
    try {
        const spass = await PasswordHash(req.body.password)
        const employee = new Employee({
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            role:req.body.role,
            password:spass
        })
        await employee.save()
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
        const spass = await PasswordHash(req.body.password)
        const employeeId = req.params.employeeId
        await Employee.findByIdAndUpdate(employeeId,{$set:{
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            role:req.body.role,
            password:spass
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
export default {
    addEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee,
    getSingleEmployee
}