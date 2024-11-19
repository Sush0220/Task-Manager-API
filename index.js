const express = require("express");
const bodyParser = require("body-parser");
const tasksRouter = require("./routes/tasks"); // Import the tasks router
// const errorHandler = require("./middleware/errorHandler"); // Import the global error handler middleware
const { authenticate } = require("./middleware/auth"); // Import authentication middleware
const authRouter = require("./routes/auth");

const app = express();

// Middleware to parse JSON requests
app.use(bodyParser.json());

app.use("/auth", authRouter);

// Mount the tasks router
app.use("/tasks", tasksRouter);

// Global error handler
// app.use(errorHandler);

// Server configuration
const PORT = 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
