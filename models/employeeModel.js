import mongoose from "mongoose"
const EmploySchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    phone:{
        type:String
    },
    password:{
        type:String
    },
    role:{
        type:String,
        enum:["Operation","Sales","Account"]
    },
    address:{
        type:String
    },
    country:{
        type:String,
        enum:["India","UK","Germany","Dubai"]
    }
    
})
const Employee = mongoose.model("Employee",EmploySchema)
export default Employee
