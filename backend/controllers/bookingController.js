// ─────────────────────────────────────────────────────────
//  controllers/bookingController.js
//  Handles Darshan Slot Booking operations
// ─────────────────────────────────────────────────────────

const Booking = require("../models/booking");
const Temple = require("../models/temple");

// ────────────────────────────────────────────────────────
//  POST /api/bookings
//  User books a darshan slot at a temple
// ────────────────────────────────────────────────────────
exports.bookDarshan = async (req, res) => {
  try {
    const { templeId, date, slotTime, numberOfPeople } = req.body;
    const userId = req.user._id;

    // 1. Validate all required fields
    if (!templeId || !date || !slotTime || !numberOfPeople) {
      return res.status(400).json({ message: "Please provide all booking details" });
    }

    // 2. Verify the temple exists
    const temple = await Temple.findById(templeId);
    if (!temple) {
      return res.status(404).json({ message: "Temple not found" });
    }

    // 3. Check if enough slots are available
    if (temple.availableSlots < numberOfPeople) {
      return res.status(400).json({
        message: `Only ${temple.availableSlots} slots available for this temple`,
      });
    }

    // 4. Reduce available slots by the number of people booked
    temple.availableSlots -= numberOfPeople;
    await temple.save(); // Save the updated slot count

    // 5. Create the booking record in MongoDB
    const booking = await Booking.create({
      userId,
      templeId,
      date,
      slotTime,
      numberOfPeople,
      paymentStatus: "pending", // Payment is initially pending
      status: "confirmed",
    });

    res.status(201).json({
      message: "Darshan booked successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ────────────────────────────────────────────────────────
//  GET /api/bookings/user/:userId
//  Get all booking history for a specific user
// ────────────────────────────────────────────────────────
exports.getUserBookings = async (req, res) => {
  try {
    // .populate() replaces the ID with actual temple data
    const bookings = await Booking.find({ userId: req.user._id })
      .populate("templeId", "templeName location darshanFee image") // Include only useful fields
      .populate("userId", "name email phone")
      .sort({ createdAt: -1 }); // Show newest bookings first

    if (bookings.length === 0) {
      return res.status(200).json({ message: "No bookings found for this user", bookings: [] });
    }

    res.status(200).json({
      message: "Bookings fetched successfully",
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ────────────────────────────────────────────────────────
//  GET /api/bookings/:id
//  Get a single booking by its ID
// ────────────────────────────────────────────────────────
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("templeId", "templeName location darshanFee")
      .populate("userId", "name email phone");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ────────────────────────────────────────────────────────
//  PUT /api/bookings/cancel/:id
//  Cancel an existing booking
// ────────────────────────────────────────────────────────
exports.cancelBooking = async (req, res) => {
  try {
    // Find the booking by its ID
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Check if it's already cancelled
    if (booking.status === "cancelled") {
      return res.status(400).json({ message: "Booking is already cancelled" });
    }

    // Restore the slots back to the temple
    await Temple.findByIdAndUpdate(booking.templeId, {
      $inc: { availableSlots: booking.numberOfPeople }, // Add back the slots
    });

    // Mark booking as cancelled
    booking.status = "cancelled";
    booking.paymentStatus = "failed";
    await booking.save();

    res.status(200).json({ message: "Booking cancelled successfully", booking });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ────────────────────────────────────────────────────────
//  PUT /api/bookings/payment/:id
//  Update payment status of a booking (pending → completed)
// ────────────────────────────────────────────────────────
exports.updatePaymentStatus = async (req, res) => {
  try {
    const { paymentStatus } = req.body;

    // Validate the new status value
    if (!["pending", "completed", "failed"].includes(paymentStatus)) {
      return res.status(400).json({ message: "Invalid payment status" });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { paymentStatus },
      { new: true } // Return the updated booking
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({
      message: "Payment status updated",
      booking,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};