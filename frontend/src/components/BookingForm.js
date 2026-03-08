import React, { useState } from "react";
import API from "../api/api";

function BookingForm() {

  const [slotId, setSlotId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/bookings", { slotId });
      alert("Booking Successful");
    } catch (err) {
      alert("Booking Failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>

      <h2>Book Slot</h2>

      <input
        type="text"
        placeholder="Slot ID"
        value={slotId}
        onChange={(e) => setSlotId(e.target.value)}
      />

      <button type="submit">Book</button>

    </form>
  );
}

export default BookingForm;