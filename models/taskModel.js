import mongoose from "mongoose"

const taskSchema = mongoose.Schema({
    running:{
        type:String
    },
    completed:{
        String
    },
    comming:{
        String
    }
})

const Task = mongoose.model("Task",taskSchema)

export default Task