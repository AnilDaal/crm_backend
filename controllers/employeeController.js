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
export default {
    insertEmployee,
    getEmployee
}