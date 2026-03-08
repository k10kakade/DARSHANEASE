import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

const TempleList = () => {
    const [temples, setTemples] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTemples = async () => {
            try {
                const { data } = await api.get("/temples");
                setTemples(data.temples || []);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch temples", err);
                setLoading(false);
            }
        };

        fetchTemples();
    }, []);

    if (loading) return <div className="loader"></div>;

    return (
        <div className="temples-container">
            <h2 className="section-title">Explore Sacred <span>Mandirs</span></h2>

            {temples.length === 0 ? (
                <div style={{ textAlign: "center", padding: "3rem" }}>
                    <h3>No temples found. Ensure the admin has populated the database.</h3>
                </div>
            ) : (
                <div className="temple-grid">
                    {temples.map((temple) => (
                        <div className="temple-card" key={temple._id}>
                            <img
                                src={temple.image || "https://images.unsplash.com/photo-1570717145749-0d19bd99d4f1"}
                                alt={temple.templeName}
                                className="temple-img"
                            />
                            <div className="temple-info">
                                <h3>{temple.templeName}</h3>
                                <p className="temple-loc">📍 {temple.location}</p>
                                <p className="temple-desc">
                                    {temple.description || "A beautiful and serene temple destination for your spiritual journey."}
                                </p>

                                {/* Cleaned layout spacing */}
                                <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid #eee' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '1rem', color: '#555', fontWeight: '500' }}>
                                        <span>Available Slots: {temple.availableSlots}</span>
                                        <span>Entry Fee: ₹{temple.darshanFee}</span>
                                    </div>
                                    <Link to={`/book/${temple._id}`} className="book-btn">Book Darshan Now</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TempleList;
