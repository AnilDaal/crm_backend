import mongoose from "mongoose";
import Employee from "./employeeModel.js";

const taskSchema = mongoose.Schema({
  task: [
    {
      title: {
        type: String,
        required: true,
      },
      assigndate: {
        type: Date,
        default: Date.now(),
      },
      deadline: {
        type: Date,
      },
      description: String,
    },
  ],
  status: {
    type: String,
    enum: ["comming", "completed", "running"],
  },
  employeeId: {
    type: String,
  },
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
