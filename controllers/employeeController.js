import Employee from "../models/employeeModel.js"
import bcrypt from "bcrypt"

const PasswordHash = async function(password){
    try {
        const passwordHash = await bcrypt.hash(password,10)
        return passwordHash
    } catch (error) {
        console.log(error.message);
    }
}
const insertEmployee = async function(req,res){
    try {
        const employee = new Employee({
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            role:req.body.role,
            password:PasswordHash
        })
        const employeeData= await employee.save()
        res.send("done....")
    } catch (error) {
        console.log(error.message);
    }
}

const getEmployee = async function(){
    try {
        const result = await Employee.find()
        res.send(result)
    } catch (error) {
        console.log(error.message);
    }
}
const updateEmployee = async(req,res)=>{
    try {
        const employeeId = req.params.employeeId
        await Employee.findByIdAndUpdate({_id:employeeId},{$set:{
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            role:req.body.role,
            password:req.body.password
        }},{new:true})
        res.send("update...")
    } catch (error) {
        console.log(error.message);       
    }
}
const deleteEmployee = async(req,res)=>{
    try {
        const employeeId = req.params.EmployeeId
        await Employee.findByIdAndDelete({_id:employeeId})
        res.send("delete...")
    } catch (error) {
        console.log(error.message);
    }
}
export default {
    insertEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}