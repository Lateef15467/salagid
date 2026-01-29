const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const authRoutes = require("./routes/auth.route");
const healthRoutes = require("./routes/health.route");
const errorHandler = require("./middlewares/error.middleware");
const userRoutes = require("./routes/user.route");
const listingRoutes = require("./routes/listing.route");

const app = express();

// ✅ Middlewares (FIRST)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// ✅ Routes (AFTER middleware)
app.use("/api/auth", authRoutes);
app.use("/api/health", healthRoutes);
app.use("/api/users", userRoutes);
app.use("/api/listings", listingRoutes);

// ✅ Error Handling (LAST)
app.use(errorHandler);

module.exports = app;
