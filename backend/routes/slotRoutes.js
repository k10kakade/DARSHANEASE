// ─────────────────────────────────────────────────────────
//  routes/slotRoutes.js
//  API routes for Darshan Time Slot management
// ─────────────────────────────────────────────────────────

const express = require("express");
const router = express.Router();

// Import controller functions
const {
    createSlot,
    getSlotsByTemple,
} = require("../controllers/slotController");

/**
 * @route   POST /api/slots
 * @desc    Create a new darshan time slot for a temple (Admin)
 * @access  Private/Admin
 */
router.post("/", createSlot);

/**
 * @route   GET /api/slots/:templeId
 * @desc    Get all available slots for a given temple
 * @access  Public
 */
router.get("/:templeId", getSlotsByTemple);

module.exports = router;