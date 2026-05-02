const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = "auth-service-secret";
const TOKEN_EXPIRES_IN = "1h";
const SALT_ROUNDS = 10;

const users = new Map();

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }

    if (users.has(username)) {
      return res.status(409).json({ error: "User already exists" });
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    users.set(username, { username, passwordHash });

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    return next(error);
  }
});

app.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }

    const user = users.get(username);
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const passwordMatches = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatches) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const token = jwt.sign({ username: user.username }, JWT_SECRET, {
      expiresIn: TOKEN_EXPIRES_IN,
    });

    return res.json({ token });
  } catch (error) {
    return next(error);
  }
});

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`auth-service listening on port ${PORT}`);
});

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error" });
});
