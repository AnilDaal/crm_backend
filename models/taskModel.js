import mongoose from "mongoose"
import Employee from "./employeeModel.js"

const taskSchema = mongoose.Schema({
    running:[{
        taskname:{
            type:String
        },
        date:{
            type:Date,
            default:Date.now()
        },
        teamates:[{
            type:'ObjectId',
            ref:'Employee'
        }]
    }],
    completed:[{
        taskname:{
            type:String
        },
        date:{
            type:Date,
            default:Date.now()
        },
        teamates:[{
            type:'ObjectId',
            ref:'Employee'
        }]
    }],
    comming:[{
        title:{
            type:String
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