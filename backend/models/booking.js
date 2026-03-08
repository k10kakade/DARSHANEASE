const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  date: String,
  slot: String,
  numberOfPeople: Number
});

module.exports = mongoose.model("Booking", BookingSchema);
