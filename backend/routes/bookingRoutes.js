const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

router.post("/", async (req, res) => {
    try {
        const { name, email, phone, date, slot, numberOfPeople } = req.body;

        const booking = new Booking({
            name,
            email,
            phone,
            date,
            slot,
            numberOfPeople
        });

        await booking.save();

        res.json({ message: "Darshan booking successful" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

router.get("/all", async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.json({ bookings });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

router.get("/stats", async (req, res) => {
    try {
        const totalBookings = await Booking.countDocuments();
        const bookings = await Booking.find();
        const totalDevotees = bookings.reduce((sum, b) => sum + (b.numberOfPeople || 0), 0);
        // Importing User model inside route to avoid circular dependency (server.js handles it if we wanted, but let's just use it).
        const User = require("../models/User");
        const totalUsers = await User.countDocuments();

        res.json({
            users: totalUsers,
            bookings: totalBookings,
            visitors: totalDevotees
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;