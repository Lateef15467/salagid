const express = require("express");
const router = express.Router();
const protect = require("../middlewares/auth.middleware");

const {
  createListing,
  getListings,
} = require("../controllers/listing.controller");

// public
router.get("/", getListings);

// protected
router.post("/", protect, createListing);

module.exports = router;
