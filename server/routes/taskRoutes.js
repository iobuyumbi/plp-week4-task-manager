const express = require("express");
const {
  createTask,
  getTasks,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  toggleTask,
} = require("../controllers/taskController");
const { protect, authorize } = require("../middleware/auth");
const router = express.Router();

// Route for creating a new task
router.post("/", protect, createTask);

// Route for getting all tasks for the logged-in user
router.get("/", protect, getTasks);

// Route for getting all tasks (admin) - must come before /:id
router.get("/all", protect, authorize(["admin"]), getAllTasks);

// Route for toggling task completion status - must come before /:id
router.patch("/:id/toggle", protect, toggleTask);

// Route for getting a specific task by ID
router.get("/:id", protect, getTaskById);

// Route for updating a specific task by ID
router.put("/:id", protect, updateTask);

// Route for deleting a specific task by ID
router.delete("/:id", protect, deleteTask);

module.exports = router;
// This code defines the task routes for creating, retrieving, updating, and deleting tasks.
