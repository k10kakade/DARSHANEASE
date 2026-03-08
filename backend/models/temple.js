// ─────────────────────────────────────────────────────────
//  models/Temple.js
//  Mongoose Schema for the Temple collection
// ─────────────────────────────────────────────────────────

const mongoose = require("mongoose");

/**
 * Temple Schema
 * Stores information about temples listed on DarshanEase.
 */
const templeSchema = new mongoose.Schema(
  {
    // Official name of the temple
    templeName: {
      type: String,
      required: [true, "Temple name is required"],
      trim: true,
    },

    // City / State / full address of the temple
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },

    // Brief description shown on the temple detail page
    description: {
      type: String,
      default: "",
      trim: true,
    },

    // Image URL for the temple
    image: {
      type: String,
      default: "https://images.unsplash.com/photo-1570717145749-0d19bd99d4f1", // Default generic temple image
    },

    // Total darshan time slots available per day (e.g. 50 slots)
    availableSlots: {
      type: Number,
      required: [true, "Available slots count is required"],
      min: [1, "At least 1 slot must be available"],
    },

    // Darshan fee per person in INR (₹)
    darshanFee: {
      type: Number,
      required: [true, "Darshan fee is required"],
      min: [0, "Fee cannot be negative"],
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

module.exports = mongoose.model("Temple", templeSchema);