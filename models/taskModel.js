import mongoose from "mongoose";
import mongooseUniqueArray from "mongoose-unique-array";

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
    default: "comming",
  },
  employeeId: {
    type: String,
  },
  teamMate: [{ type: String, unique: true }],
});

taskSchema.plugin(mongooseUniqueArray);
const Task = mongoose.model("Task", taskSchema);

export default Task;
