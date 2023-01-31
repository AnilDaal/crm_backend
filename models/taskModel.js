import mongoose from "mongoose"
import Employee from "./employeeModel.js"

const taskSchema = mongoose.Schema({
    running:[{
        taskname:{
            type:String,
        },
        date:{
            type:Date,
            default:Date.now()
        }
    }],
    completed:[{
        taskname:{
            type:String
        },
        date:{
            type:Date,
            default:Date.now()
        }
    }],
    comming:[{
        title:{
            type:String,
            required:true
        },
        assigndate:{
            type:Date,
            default:Date.now()
        },
        employeeId:{
            type:String
        },
        deadline:{
            type:Date
        },
        description:String
    }]
})

const Task = mongoose.model("Task",taskSchema)

export default Task