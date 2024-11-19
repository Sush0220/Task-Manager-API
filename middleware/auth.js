const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const path = require("path");
dotenv.config({ path: path.resolve(__dirname, "config/.env") });

const JWT_SECRET = "qwertyuiopasdfghjkl1234567890";

const authenticate = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ error: "Authorization header is missing" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Token is missing" });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).send({ error: "Invalid token" });
  }
};

module.exports = { authenticate };
