import Task from "../models/taskModel.js"

const createTask = async (req,res)=>{
    const {addTask} = req.body
    try {
        const taskData = await Task.create({
            running:addTask
        })
        res.status(201).json(taskData)
    } catch (error) {
        res.status(501).json({message:error})
    }
}

const completeTask = async (req,res)=>{
    const {task}
}