const express = require("express");
const router = express.Router();
const protect = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");

const {
  createListing,
  getListings,
  updateListing,
  deleteListing,
} = require("../controllers/listing.controller");

// public
router.get("/", getListings);

// protected
router.post("/", protect, createListing);

router.post("/", protect, upload.array("images", 5), createListing);

router.put("/:id", protect, updateListing);
router.delete("/:id", protect, deleteListing);

module.exports = router;
