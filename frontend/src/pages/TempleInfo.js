import React from "react";
import { Link } from "react-router-dom";
import entranceBg from "../assets/entrance.jpg";

const TempleInfo = () => {
    return (
        <div>
            <div className="parallax-bg" style={{ backgroundImage: `url(${entranceBg})`, height: '40vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="hero-overlay"></div>
                <h1 className="relative z-10" style={{ fontSize: '3.5rem', color: '#D4AF37', textShadow: '2px 2px 10px rgba(0,0,0,0.9)', textAlign: 'center' }}>
                    Temple Information
                </h1>
            </div>

            <div className="info-container" style={{ padding: '4rem 5%', maxWidth: '1200px', margin: '0 auto' }}>

                <div className="info-grid">

                    {/* History Section */}
                    <div className="info-card">
                        <h3>📜 History of the Temple</h3>
                        <p>
                            The Shree Mahalaxmi Temple of Kolhapur is one of the 18 Maha Shakti Peethas listed in various puranas of Hinduism.
                            Built in the 7th century by the Chalukya empire, the temple holds immense spiritual significance.
                            It is historically believed that Goddess Mahalaxmi resides in Kolhapur, known anciently as Karvir.
                        </p>
                    </div>

                    {/* Architecture Section */}
                    <div className="info-card">
                        <h3>🏛️ Architecture</h3>
                        <p>
                            The temple structure features the majestic <strong>Hemadpanthi</strong> architectural style built with local black stone.
                            The beautiful mandap contains deeply carved pillars, and the temple premises house several subsidiary shrines including the shrine of Goddess Bhavani.
                            The five towering spires (Shikharas) adorn the skyline of the courtyard.
                        </p>
                    </div>

                    {/* Darshan & Aarti Timings Section */}
                    <div className="info-card">
                        <h3>⏳ Darshan & Aarti Timings</h3>
                        <p>Temple Doors open daily at <strong>04:30 AM</strong> and close at <strong>10:30 PM</strong>.</p>
                        <ul style={{ marginTop: '10px' }}>
                            <li><strong>Kakad Aarti:</strong> 05:30 AM</li>
                            <li><strong>Morning Mahapuja:</strong> 08:30 AM</li>
                            <li><strong>Afternoon Aarti:</strong> 11:30 AM</li>
                            <li><strong>Evening Aarti:</strong> 08:00 PM</li>
                            <li><strong>Shej Aarti:</strong> 10:00 PM</li>
                        </ul>
                    </div>

                    {/* Festivals Section */}
                    <div className="info-card">
                        <h3>🎊 Key Festivals</h3>
                        <p>
                            The temple experiences extremely heavy footfall during specific unique festivals:
                        </p>
                        <ul style={{ marginTop: '10px' }}>
                            <li>
                                <strong>Kirnotsav (Festival of Sun Rays):</strong>
                                Occurs around Jan 31 - Feb 2 & Nov 9 - Nov 11. The sun rays fall directly on the deity's feet, chest, and face sequentially at sunset.
                            </li>
                            <li>
                                <strong>Navratri:</strong>
                                A grand 9-day celebration marked by special pujas, floral decorations, and huge crowd darshans.
                            </li>
                            <li><strong>Diwali / Rathotsav:</strong> A grand chariot procession is held in the city.</li>
                        </ul>
                    </div>

                </div>

                <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                    <h3 style={{ color: 'var(--primary-color)', marginBottom: '1.5rem', fontSize: '1.8rem' }}>Ready to plan your spiritual journey?</h3>
                    <Link to="/book" className="submit-btn" style={{ padding: '1rem 3rem', display: 'inline-block', width: 'auto', textDecoration: 'none' }}>
                        Book Darshan Now
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default TempleInfo;
