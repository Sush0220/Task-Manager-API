const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const path = require("path");
const Task = require("./model/task");
const User = require("./model/user");
const bcrypt = require("bcrypt");
const { run } = require("jest-cli");
dotenv.config({ path: path.resolve(__dirname, "config/.env") });

const app = express();
app.use(bodyParser.json());

//Middleware for authentication
function authenticate(req, res, next) {
  const token = req.header("Authorization").split(" ")[1];
  if (!token) {
    return res.status(401).send({ error: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).send({ error: "Invalid token" });
  }
}

// Connect TO MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/task-manager-api")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("MongoDB Connection Error", err);
  });

//User routes
app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(401).send({ error: "Invalid credentials" });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).send({ error: "Invalid credentials" });
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.send({ token });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

//Retrieve all tasks
app.get("/tasks", authenticate, async (req, res) => {
  const tasks = await Task.find();
  res.send(tasks);
});

//Retrieve single task
app.get("/tasks/:id", authenticate, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).send({ error: "Task not found" });
    res.send(task);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

//Create a new task
app.post("/tasks", authenticate, async (req, res) => {
  try {
    const { title, description, due_date } = req.body;
    const task = new Task({ title, description, due_date });
    await task.save();
    res.status(201).send(task);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

//Update a task
app.put("/tasks/:id", authenticate, async (req, res) => {
  try {
    const { title, description, due_date, status } = req.body;
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, due_date, status, updated_at: Date.now() },
      { new: true, runValidators: true }
    );
    if (!task) return res.status.send({ error: "Task not found" });
    res.send(task);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

app.delete("/tasks/:id", authenticate, async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).send({ error: "Task not found" });
    res.send({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

app.patch("/tasks/:id/complete", authenticate, async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status: "completed", updated_at: Date.now() },
      { new: true, runValidators: true }
    );
    if (!task) return res.status(404).send({ error: "Task not found" });
    res.send(task);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
