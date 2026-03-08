import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import bookingBg from "../assets/aambabai.jpg";

const Booking = () => {
    const { templeId } = useParams();
    const navigate = useNavigate();
    const [temples, setTemples] = useState([]);

    let user = {};
    try {
        const userStr = localStorage.getItem("user");
        user = userStr && userStr !== "undefined" ? JSON.parse(userStr) : {};
    } catch (e) {
        user = {};
    }

    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        templeId: templeId || "",
        date: "",
        timeSlot: "",
        numberOfPersons: 1,
    });

    const [message, setMessage] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [ticketData, setTicketData] = useState(null);

    useEffect(() => {
        setFetching(false);
    }, [templeId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        if (!token) {
            setError(true);
            setMessage("Session expired. You must be logged in to book a darshan.");
            setTimeout(() => navigate('/login'), 2000);
            return;
        }

        setLoading(true);

        try {
            const payload = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                date: formData.date,
                slot: formData.timeSlot,
                people: formData.numberOfPersons,
            };

            await axios.post("http://localhost:5000/api/booking", payload);

            setLoading(false);
            setMessage("Darshan booking successful");
            setError(false);
            setTicketData({
                ...payload,
                bookingId: "B" + Math.floor(Math.random() * 1000000)
            });

        } catch (err) {
            setLoading(false);
            setError(true);
            setMessage(err.response?.data?.message || "Booking failed. Ensure available slots are enough.");
        }
    };

    if (fetching) return <div className="loader"></div>;

    return (
        <div>
            <div className="parallax-bg" style={{ backgroundImage: `url(${bookingBg})`, height: '35vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="hero-overlay"></div>
                <h1 className="relative z-10" style={{ fontSize: '3.5rem', color: '#D4AF37', textShadow: '2px 2px 10px rgba(0,0,0,0.9)' }}>Book Your Darshan</h1>
            </div>
            <div className="form-container">
                {ticketData ? (
                    <div className="ticket-slip" id="printable-ticket">
                        <div className="ticket-header">
                            <h2>🙏 Shree Mahalaxmi Temple 🙏</h2>
                            <p>Darshan E-Ticket</p>
                        </div>
                        <div className="ticket-body">
                            <p><strong>Booking ID:</strong> {ticketData.bookingId}</p>
                            <p><strong>Devotee Name:</strong> {ticketData.name}</p>
                            <p><strong>Date:</strong> {ticketData.date}</p>
                            <p><strong>Time Slot:</strong> {ticketData.slot}</p>
                            <p><strong>No. of People:</strong> {ticketData.people}</p>
                            <p><strong>Phone:</strong> {ticketData.phone}</p>
                        </div>
                        <div className="ticket-footer">
                            <p>Please show this ticket at the VIP/Online Darshan gateway.</p>
                        </div>
                        <div className="ticket-actions no-print">
                            <button onClick={() => window.print()} className="submit-btn" style={{ marginRight: '10px', width: 'auto' }}>Print Ticket</button>
                            <button onClick={() => navigate('/')} className="submit-btn" style={{ background: '#333', width: 'auto' }}>Go to Home</button>
                        </div>
                    </div>
                ) : (
                    <div className="form-box" style={{ maxWidth: '600px' }}>
                        <h2>Book Darshan Tickets</h2>
                        {message && (
                            <div className={`message ${error ? "error" : "success"}`}>
                                {message}
                            </div>
                        )}
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                            </div>

                            <div className="form-group">
                                <label>Email Address</label>
                                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                            </div>

                            <div className="form-group">
                                <label>Phone Number</label>
                                <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
                            </div>

                            <div className="form-group" style={{ display: 'none' }}>
                                <label>Select Mandir</label>
                                <input type="text" name="templeId" value={formData.templeId} readOnly />
                            </div>

                            <div className="form-group">
                                <label>Select Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Select Time Slot</label>
                                <select
                                    name="timeSlot"
                                    value={formData.timeSlot}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">-- Choose a Slot --</option>
                                    <option value="06:00 AM - 08:00 AM">06:00 AM - 08:00 AM (Morning Darshan)</option>
                                    <option value="09:00 AM - 12:00 PM">09:00 AM - 12:00 PM (General Darshan)</option>
                                    <option value="02:00 PM - 05:00 PM">02:00 PM - 05:00 PM (Afternoon Darshan)</option>
                                    <option value="06:00 PM - 09:00 PM">06:00 PM - 09:00 PM (Evening Aarti)</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Number of Devotees</label>
                                <input
                                    type="number"
                                    name="numberOfPersons"
                                    min="1"
                                    max="15"
                                    value={formData.numberOfPersons}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <button type="submit" className="submit-btn" disabled={loading} style={{ marginTop: '1.5rem' }}>
                                {loading ? "Confirming Darshan..." : "Confirm Booking"}
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Booking;
