// ─────────────────────────────────────────────────────────
//  routes/templeRoutes.js
//  API routes for Temple management
// ─────────────────────────────────────────────────────────

const express = require("express");
const router = express.Router();

// Import controller functions
const {
  createTemple,
  getTemples,
  getTempleById,
  updateTemple,
  deleteTemple,
} = require("../controllers/templeController");

/**
 * @route   POST /api/temples
 * @desc    Add a new temple (Admin only in full implementation)
 * @access  Private/Admin
 */
router.post("/", createTemple);

/**
 * @route   GET /api/temples
 * @desc    Get all temples listed on DarshanEase
 * @access  Public
 */
router.get("/", getTemples);

/**
 * @route   GET /api/temples/:id
 * @desc    Get a single temple's details by its ID
 * @access  Public
 */
router.get("/:id", getTempleById);

/**
 * @route   PUT /api/temples/:id
 * @desc    Update temple info (Admin only in full implementation)
 * @access  Private/Admin
 */
router.put("/:id", updateTemple);

/**
 * @route   DELETE /api/temples/:id
 * @desc    Delete a temple listing (Admin only in full implementation)
 * @access  Private/Admin
 */
router.delete("/:id", deleteTemple);

module.exports = router;