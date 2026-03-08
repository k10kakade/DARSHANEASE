import React, { useEffect, useState } from "react";
import API from "../api/api";

const SlotList = () => {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    try {
      const response = await API.get("/slots");
      setSlots(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching slots:", error);
      setLoading(false);
    }
  };

  const bookSlot = (slotId) => {
    alert("Booking slot id: " + slotId);
    // Later you can connect POST /api/bookings
  };

  if (loading) {
    return <h2>Loading slots...</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Temple Darshan Slots</h2>

      {slots.length === 0 ? (
        <p>No slots available</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Slot Time</th>
              <th>Available</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {slots.map((slot) => (
              <tr key={slot._id}>
                <td>{slot.time}</td>
                <td>{slot.available}</td>
                <td>
                  <button
                    disabled={slot.available === 0}
                    onClick={() => bookSlot(slot._id)}
                  >
                    Book
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SlotList;