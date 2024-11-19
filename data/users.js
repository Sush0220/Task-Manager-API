const users = [];
let userId = 1;

const addUser = ({ email, password }) => {
  const newUser = { id: userId++, email, password };
  users.push(newUser);
  return newUser;
};

const findUserByEmail = (email) => {
  return users.find((user) => user.email === email);
};

module.exports = { users, addUser, findUserByEmail };
