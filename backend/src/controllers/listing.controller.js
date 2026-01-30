const Listing = require("../models/listing.model");

// CREATE LISTING
const createListing = async (req, res) => {
  try {
    const { title, description, price, category } = req.body;

    if (!title || !description || !price || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const images = req.files ? req.files.map((file) => file.path) : [];

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
    const { keyword, category, minPrice, maxPrice, sort } = req.query;

    let query = {};

    // search by title
    if (keyword) {
      query.title = { $regex: keyword, $options: "i" };
    }

    // filter by category
    if (category) {
      query.category = category;
    }

    // price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    let listingsQuery = Listing.find(query).populate("user", "name email");

    // sorting
    if (sort === "price") {
      listingsQuery = listingsQuery.sort({ price: 1 });
    } else {
      listingsQuery = listingsQuery.sort({ createdAt: -1 });
    }

    const listings = await listingsQuery;

    res.status(200).json({
      success: true,
      count: listings.length,
      listings,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE LISTING
const updateListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    if (listing.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );

    res.status(200).json({
      success: true,
      listing: updatedListing,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE LISTING
const deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    if (listing.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await listing.deleteOne();

    res.status(200).json({
      success: true,
      message: "Listing deleted",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createListing, getListings, updateListing, deleteListing };
