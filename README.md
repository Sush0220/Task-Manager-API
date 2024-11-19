# Task Management API
This is a simple Task Management API built with Node.js and Express.js. It supports basic CRUD operations for tasks and provides user registration and login functionalities with JWT-based authentication.

## Features
  - User Authentication:
  - Register a new user
  - Login with existing credentials
  - JWT-based authentication for protected routes

## Task Management:
  - Create a new task
  - Retrieve all tasks
  - Retrieve a specific task by ID
  - Update a task
  - Delete a task
  - Mark a task as complete

## Technologies Used
  - Node.js (JavaScript runtime)
  - Express.js (Web framework for Node.js)
  - JWT (JSON Web Tokens for user authentication)
  - bcrypt (Password hashing and validation)
  - In-memory storage (for users and tasks, can be replaced with a database later)

## Description of Files/Directories:
- app.js:
  - The main entry point of the application.
  - Initializes Express, configures middleware, and mounts route handlers.
- routes/:
  - Contains route definitions for various modules (e.g., tasks.js for task management).
  - Encapsulates all endpoint logic in modular files for easier maintainability.
- middleware/:
  - Holds custom middleware functions, such as auth.js for authentication.
- utils/:
  - Contains reusable utility functions or validation schemas like validation.js for input validation.
- data/:
  - Stores in-memory data or abstracts data storage logic (e.g., tasks.js for tasks storage and helper functions like ID generation).
- tests/:
  - Contains unit and integration test files for various modules, ensuring the application behaves as expected.
- package.json:
  - Defines project dependencies (e.g., express, joi) and includes scripts like start or test.
- README.md:
  - Provides instructions on how to set up, run, and test the application.

### Prerequisites

Before you can run the project, ensure that you have the following installed on your local machine:

- **Node.js** (version 14 or higher) - [Download Node.js](https://nodejs.org/)
- **npm** (Node Package Manager) - Comes installed with Node.js
- You can verify if these are installed by running the following commands in your terminal:

```bash
node -v
npm -v
```

## Installation
1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/your-username/task-management-api.git
   cd task-management-api
   ```
2. Install dependencies: Run the following command to install the necessary dependencies for the project:
   ```bash
   npm install
   ```
## Running the Application
- Start the server
  ```bash
   npm start
   ```
## Running tests
The project uses Jest for running unit tests to ensure the application works as expected. You can run the tests using the following command:
```bash
npm test
```


