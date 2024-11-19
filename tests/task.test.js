const request = require("supertest");
const app = require("../index");
const Task = require("../model/task");
const { describe } = require("yargs");

describe("POST /tasks", () => {
  it("should create a new task", async () => {
    const res = await request(app)
      .post("/tasks")
      .send({
        title: "Test Task",
        description: "Test Description",
        due_date: new Date(),
      })
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM5YjhmMWJjYzIwZDE2MzM1YzY1NWIiLCJpYXQiOjE3MzE4MzcwMDgsImV4cCI6MTczMTg0MDYwOH0.ignCm7MiYq6MYtt9wznypuOyxwKdmbkU6x7ZC8xqGts"
      );
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.title).toBe("Test Task");
  });
});
