import Task from "../models/taskModel.js";

const addTask = async (req, res) => {
  const { description, assigndate, deadline, title } = req.body;
  if (!description || !assigndate || !deadline || !title) {
    return res.status(401).json({ message: "please fill all mandatory field" });
  }
  try {
    const employeeId = req.params.employeeId;
    const task = await Task.create({
      comming: [
        {
          description,
          title,
          assigndate,
          deadline,
          employeeId: employeeId,
        },
      ],
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
};

const getTask = async (req, res) => {
  try {
    const employeeTask = await Task.find();
    res.status(201).json(employeeTask);
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
};

// const moveTask = async (req, res) => {
//   const employeeId = req.params.employeeId;
//   try {
//     const taskData = await Task.findById(employeeId);
//   } catch (error) {}
// };

export default {
  getTask,
  addTask,
};
