const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const path = require("path");
const { users, addUser, findUserByEmail } = require("../data/users");
dotenv.config({ path: path.resolve(__dirname, "config/.env") });

const router = express.Router();

const JWT_SECRET = "qwertyuiopasdfghjkl1234567890";

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).send({ error: "Email and password are required" });
    const existingUser = findUserByEmail(email);
    if (existingUser) {
      return res.status(409).send({ error: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = addUser({ email, password: hashedPassword });
    res.status(201).json({
      message: "User Registered SuccessFully!",
      user: { _id: user.id, email: user.email },
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).send({ error: "Email and password are required" });
    const user = findUserByEmail(email);
    if (!user)
      return res.status(401).send({ error: "Invalid email or password" });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).send({ error: "Invalid email or password" });
    const token = jwt.sign({ _id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "Login SuccessFully!", token });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
