// __tests__/tasks.test.js
const request = require("supertest");
const app = require("../index"); // Import the app instance

let server;
let token; // Store token to use in requests
let taskId;

beforeAll(async () => {
  server = app.listen(3000); // Start the server before tests run

  // Register a user and get token for authorization
  const user = {
    email: "test@example.com",
    password: "password123",
  };

  // Register the user
  const registerResponse = await request(app)
    .post("/auth/register")
    .send(user)
    .expect(201); // Expect 201 Created when registering a new user

  // Login to get the token
  const loginResponse = await request(app)
    .post("/auth/login")
    .send(user)
    .expect(200); // Expect 200 OK when logging in

  token = loginResponse.body.token; // Store the token for use in tasks creation
});

afterAll(() => {
  server.close(); // Close the server after tests have finished
});

describe("Task API", () => {
  it("should create a new task successfully", async () => {
    const newTask = {
      title: "Test Task",
      description: "This is a test task",
      due_date: "2024-12-31",
    };

    const response = await request(app) // Use the app instance
      .post("/tasks")
      .set("Authorization", `Bearer ${token}`) // Send the token in the Authorization header
      .send(newTask)
      .expect(201); // Expecting HTTP status 201 (Created)
    expect(response.body.newTask).toBeDefined();
    // Store task ID for later use
    taskId = response.body.newTask.id;

    const createdTask = response.body.newTask;

    expect(createdTask.title).toBe(newTask.title);
    expect(createdTask.due_date).toBe(newTask.due_date);
    expect(createdTask.status).toBe("pending");
    expect(createdTask.description).toBe(newTask.description);
    expect(createdTask).toHaveProperty("created_at");
    expect(createdTask).toHaveProperty("updated_at");
  });

  // Other tests...
});
