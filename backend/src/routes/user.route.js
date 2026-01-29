const express = require("express");
const router = express.Router();
const protect = require("../middlewares/auth.middleware");

router.get("/me", protect, (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

module.exports = router;
