// ─────────────────────────────────────────────────────────
//  routes/adminRoutes.js
//  API routes for Admin Panel operations
// ─────────────────────────────────────────────────────────

const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/authMiddleware");

const {
    getAllBookings,
    getAllUsers,
    getAdminStats
} = require("../controllers/adminController");

/**
 * @route   GET /api/admin/bookings
 * @desc    Get all darshan bookings across all users
 * @access  Private/Admin
 */
router.get("/bookings", protect, adminOnly, getAllBookings);

/**
 * @route   GET /api/admin/users
 * @desc    Get all registered users
 * @access  Private/Admin
 */
router.get("/users", protect, adminOnly, getAllUsers);

/**
 * @route   GET /api/admin/stats
 * @desc    Get counts and stats for admin dashboard
 * @access  Private/Admin
 */
router.get("/stats", protect, adminOnly, getAdminStats);

module.exports = router;
