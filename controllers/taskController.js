import Task from "../models/taskModel.js";

const addTask = async (req, res) => {
  const { description, assigndate, deadline, title } = req.body;
  const employeeId = req.params.employeeId;
  if (!description || !assigndate || !deadline || !title) {
    return res.status(401).json({ message: "please fill all mandatory field" });
  }
  try {
    const taskData = await Task.create({
      task: [
        {
          description,
          title,
          assigndate,
          deadline,
        },
      ],
      employeeId,
    });
    res.status(201).json(taskData);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const addTeamMate = async (req, res) => {
  const { taskId } = req.params;
  const employeeId = req.body.employeeId;
  try {
    const employeeData = await Task.findByIdAndUpdate(
      taskId,
      {
        $push: {
          teamMate: employeeId,
        },
      },
      { new: true }
    );
    res.status(201).json(employeeData);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const getEmployeeTask = async (req, res) => {
  const employeeId = req.params.employeeId;
  try {
    const employeeTask = await Task.find({ employeeId });
    res.status(201).json(employeeTask);
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
};

const updateEmployeeTask = async (req, res) => {
  const { description, assigndate, deadline, teamMate, title, status } =
    req.body;
  const { employeeId, taskId } = req.params;
  if (!description || !assigndate || !deadline || !title || !status) {
    return res.status(401).json({ message: "please fill all mandatory field" });
  }
  try {
    const taskData = await Task.findByIdAndUpdate(
      taskId,
      {
        $set: {
          task: [
            {
              description,
              title,
              assigndate,
              deadline,
            },
          ],
          employeeId,
          status,
          teamMate: teamMate,
        },
      },
      { new: true }
    );
    res.status(201).json(taskData);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const getAllTask = async (req, res) => {
  try {
    const allTask = await Task.find();
    res.status(201).json(allTask);
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
  getAllTask,
  getEmployeeTask,
  updateEmployeeTask,
  addTask,
  addTeamMate,
};
