const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
      required: true,
      enum: ["property", "vehicle", "service", "electronics", "other"],
    },

    images: [
      {
        type: String, // image URL (later: Cloudinary)
      },
    ],

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["active", "sold"],
      default: "active",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Listing", listingSchema);
