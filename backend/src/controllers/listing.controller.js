const Listing = require("../models/listing.model");

// CREATE LISTING
const createListing = async (req, res) => {
  try {
    const { title, description, price, category, images } = req.body;

    if (!title || !description || !price || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const listing = await Listing.create({
      title,
      description,
      price,
      category,
      images,
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      listing,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET ALL LISTINGS
const getListings = async (req, res) => {
  try {
    const listings = await Listing.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: listings.length,
      listings,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createListing, getListings };
