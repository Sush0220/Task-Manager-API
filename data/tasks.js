let tasks = [];
let taskId = 1;

const generatedId = () => taskId++;

const getTasks = () => tasks;

const findTaskById = (id) => tasks.find((task) => task.id === id);

const addTask = (task) => {
  const newTask = {
    id: generatedId(),
    ...task,
    status: "pending",
    created_at: new Date(),
    updated_at: new Date(),
  };
  tasks.push(newTask);
  return newTask;
};

const updateTask = (id, updates) => {
  const task = findTaskById(id);
  if (!task) return null;

  Object.assign(task, updates, { updated_at: new Date() });
  return task;
};

const deleteTask = (id) => {
  const index = tasks.findIndex((task) => task.id === id);
  console.log(index);

  if (index === -1) return null;

  return tasks.splice(index, 1)[0];
};

module.exports = {
  tasks,
  generatedId,
  getTasks,
  findTaskById,
  addTask,
  updateTask,
  deleteTask,
};
