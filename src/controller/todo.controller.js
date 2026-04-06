const todoModel = require("../model/todo.model");

const addTask = async (req, res) => {
  try {
    const todo = await todoModel.create({
      ...req.body,
      user: req.user.id,
    });

    res.status(201).json({
      message: "Task created",
      todo,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating task",
    });
  }
};

const getTask = async (req, res) => {
  try {
    let todos;

    if (req.user.role === "admin") {
      todos = await todoModel.find().populate("user", "username email");
    } else {
      todos = await todoModel.find({ user: req.user.id });
    }

    res.status(200).json({
      message: "Tasks fetched",
      todos,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching tasks",
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const todo = await todoModel.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: "Task not found" });
    }

    const isOwner = String(todo.user) === String(req.user.id);
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        message: "Not allowed to delete this task",
      });
    }

    await todoModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Task deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting task",
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const todo = await todoModel.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: "Task not found" });
    }

    const isOwner = String(todo.user) === String(req.user.id);
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        message: "Not allowed to update this task",
      });
    }

    const updated = await todoModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({
      message: "Task updated",
      updated,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating task",
    });
  }
};

const updateTaskPatch = async (req, res) => {
  try {
    const todo = await todoModel.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: "Task not found" });
    }

    const isOwner = String(todo.user) === String(req.user.id);
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        message: "Not allowed",
      });
    }

    const updated = await todoModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      message: "Task updated",
      updated,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating task",
    });
  }
};

module.exports = {
  addTask,
  getTask,
  deleteTask,
  updateTask,
  updateTaskPatch,
};
