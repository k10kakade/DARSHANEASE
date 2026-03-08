// ─────────────────────────────────────────────────────────
//  routes/userRoutes.js
//  API routes for User Registration and Login
// ─────────────────────────────────────────────────────────

const express = require("express");
const router = express.Router();

// Import controller functions
const {
    register,
    login,
    getProfile,
} = require("../controllers/userController");

/**
 * @route   POST /api/users/register
 * @desc    Register a new user
 * @access  Public (no login required)
 */
router.post("/register", register);

/**
 * @route   POST /api/users/login
 * @desc    Login with email and password, returns JWT token
 * @access  Public (no login required)
 */
router.post("/login", login);

/**
 * @route   GET /api/users/profile/:id
 * @desc    Get user profile details by user ID
 * @access  Private (user must be logged in)
 */
router.get("/profile/:id", getProfile);

module.exports = router;