// ─────────────────────────────────────────────────────────
//  controllers/slotController.js
//  Handles Darshan Time Slot operations
// ─────────────────────────────────────────────────────────

const Slot = require("../models/slot");

// ────────────────────────────────────────────────────────
//  POST /api/slots
//  Admin creates a new time slot for a temple
// ────────────────────────────────────────────────────────
exports.createSlot = async (req, res) => {
  try {
    const { templeId, date, startTime, endTime, capacity } = req.body;

    // Validate required fields
    if (!templeId || !date || !startTime || !endTime || !capacity) {
      return res.status(400).json({ message: "Please provide all slot details" });
    }

    // Create and save the slot in MongoDB
    const slot = await Slot.create({
      templeId,
      date,
      startTime,
      endTime,
      capacity,
    });

    res.status(201).json({
      message: "Slot created successfully",
      slot,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ────────────────────────────────────────────────────────
//  GET /api/slots/:templeId
//  Get all available slots for a specific temple
// ────────────────────────────────────────────────────────
exports.getSlotsByTemple = async (req, res) => {
  try {
    const slots = await Slot.find({ templeId: req.params.templeId })
      .sort({ date: 1, startTime: 1 }); // Sort by date, then time

    if (slots.length === 0) {
      return res.status(200).json({ message: "No slots found for this temple", slots: [] });
    }

    res.status(200).json({
      message: "Slots fetched successfully",
      count: slots.length,
      slots,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};