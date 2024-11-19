const express = require("express");
const { validateTask } = require("../utils/validation");
const { authenticate } = require("../middleware/auth");
const {
  tasks,
  generatedId,
  getTasks,
  findTaskById,
  addTask,
  updateTask,
  deleteTask,
} = require("../data/tasks");

const router = express.Router();

router.get("/", authenticate, (req, res) => {
  try {
    res.status(200).json(getTasks());
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.get("/:id", authenticate, (req, res) => {
  try {
    const task = findTaskById(parseInt(req.params.id));
    if (!task) return res.status(404).send({ error: "Task not found" });
    res.status(200).json(task);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.post("/", authenticate, async (req, res) => {
  try {
    const { error } = validateTask(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });
    const newTask = addTask(req.body);
    res.status(201).json({ message: "Task created successfully", newTask });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.put("/:id", authenticate, (req, res) => {
  try {
    const task = findTaskById(parseInt(req.params.id));
    if (!task) res.status(404).send({ error: "Task not found" });
    const updates = req.body;
    const updatedTask = updateTask(task.id, updates);
    res.status(200).json({ message: "Task updated successfully", updatedTask });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.delete("/:id", authenticate, (req, res) => {
  try {
    const deletedTask = deleteTask(parseInt(req.params.id));
    console.log(deletedTask);

    if (!deletedTask) return res.status(404).send({ error: "Task not found" });
    res.status(200).json({ message: "Task deleted successfully", deletedTask });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.patch("/:id/complete", authenticate, (req, res) => {
  try {
    const task = findTaskById(parseInt(req.params.id));
    if (!task) return res.status(404).send({ error: "Task not found" });
    const updatedTask = updateTask(task.id, { status: "completed" });
    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
