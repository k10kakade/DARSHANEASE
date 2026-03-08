// ─────────────────────────────────────────────────────────
//  models/Slot.js
//  Mongoose Schema for Darshan Time Slots per Temple
// ─────────────────────────────────────────────────────────

const mongoose = require("mongoose");

/**
 * Slot Schema
 * Represents a specific time window for darshan at a temple on a given date.
 * Example: Tirupati Temple → 15-Mar-2025 → "06:00 AM - 07:00 AM" (capacity 30)
 */
const slotSchema = new mongoose.Schema(
  {
    // Which temple this slot belongs to
    templeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Temple",
      required: [true, "Temple ID is required"],
    },

    // Date for this darshan slot
    date: {
      type: Date,
      required: [true, "Date is required"],
    },

    // Start time of the slot (e.g. "06:00 AM")
    startTime: {
      type: String,
      required: [true, "Start time is required"],
      trim: true,
    },

    // End time of the slot (e.g. "07:00 AM")
    endTime: {
      type: String,
      required: [true, "End time is required"],
      trim: true,
    },

    // Maximum number of people allowed in this slot
    capacity: {
      type: Number,
      required: [true, "Capacity is required"],
      min: [1, "Capacity must be at least 1"],
    },

    // How many people have already booked this slot
    bookedCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Slot", slotSchema);