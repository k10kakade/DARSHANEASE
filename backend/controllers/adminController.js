// ─────────────────────────────────────────────────────────
//  controllers/adminController.js
//  Admin API logic
// ─────────────────────────────────────────────────────────

const User = require("../models/user");
const Booking = require("../models/booking");

// ────────────────────────────────────────────────────────
//  GET /api/admin/bookings
//  Admin sees all bookings
// ────────────────────────────────────────────────────────
exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate("userId", "name email phone")
            .populate("templeId", "templeName location")
            .sort({ createdAt: -1 });

        res.status(200).json({ bookings, count: bookings.length });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// ────────────────────────────────────────────────────────
//  GET /api/admin/users
//  Admin sees all users
// ────────────────────────────────────────────────────────
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password").sort({ createdAt: -1 });
        res.status(200).json({ users, count: users.length });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// ────────────────────────────────────────────────────────
//  GET /api/admin/stats
//  Admin simple stats
// ────────────────────────────────────────────────────────
exports.getAdminStats = async (req, res) => {
    try {
        const usersCount = await User.countDocuments();
        const bookingsCount = await Booking.countDocuments();

        // Calculate total visitors (sum of numberOfPeople in all bookings)
        const bookings = await Booking.find();
        const totalVisitors = bookings.reduce((acc, curr) => acc + (curr.numberOfPeople || 0), 0);

        res.status(200).json({
            users: usersCount,
            bookings: bookingsCount,
            visitors: totalVisitors
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
