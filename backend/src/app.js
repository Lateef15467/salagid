const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const healthRoutes = require("./routes/health.route");
const authRoutes = require("./routes/auth.route");

// routes
app.use("/api/auth", authRoutes);

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/health", healthRoutes);

module.exports = app;
