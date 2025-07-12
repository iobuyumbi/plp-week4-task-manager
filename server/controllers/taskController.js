const Task = require("../models/Task");

// POST /api/tasks
exports.createTask = async (req, res) => {
  try {
    const task = await Task.create({
      ...req.body,
      owner: req.user._id,
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// GET /api/tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ owner: req.user._id });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// GET /api/tasks/all
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate("owner", "email");
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// GET /api/tasks/:id
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// PUT /api/tasks/:id
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// PATCH /api/tasks/:id/toggle
exports.toggleTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Check if user owns the task
    if (task.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    task.completed = !task.completed;
    await task.save();

    res.status(200).json({ completed: task.completed });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// DELETE /api/tasks/:id
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
