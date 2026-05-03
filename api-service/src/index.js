const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = process.env.PORT || process.env.API_SERVICE_PORT || 5001;
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is required");
}

app.use(express.json());

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const [scheme, token] = authHeader ? authHeader.split(" ") : [];

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ error: "Authorization token is required" });
  }

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    return next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "You are authorized" });
});

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`api-service listening on port ${PORT}`);
});
