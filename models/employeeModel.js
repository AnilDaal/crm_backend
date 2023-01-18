import mongoose from "mongoose"
const EmploySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    role:{
        type:String
    },
    image:{
        type:String,
    },
    password:{
        type:String,
        required:true
    }
})
const Employee = mongoose.model("Employee",EmploySchema)
export default Employee
