import React from "react";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-col" style={{ flex: 2 }}>
                    <h3>🙏 Shree Mahalaxmi Temple</h3>
                    <p>
                        The official portal for booking Darshan at the sacred Mahalaxmi Temple, Kolhapur.
                        Plan your spiritual journey, check timings, and seek the blessings of Goddess Ambabai.
                    </p>
                </div>

                <div className="footer-col">
                    <h3 style={{ color: 'white', fontSize: '1.2rem' }}>Quick Links</h3>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/temple-info">Temple Information</a></li>
                        <li><a href="/book">Darshan Booking</a></li>
                        <li><a href="/login">Login / Register</a></li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h3 style={{ color: 'white', fontSize: '1.2rem' }}>Contact Us</h3>
                    <ul>
                        <li>Email: devasthan@mahalaxmikolhapur.com</li>
                        <li>Phone: +91 231 2541779</li>
                        <li>Address: Bhausingji Road, Mahadwar Road, Kolhapur, Maharashtra 416012</li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Shree Mahalaxmi Temple (Kolhapur). All Rights Reserved.</p>
                <p style={{ fontSize: '0.85rem', marginTop: '5px' }}>MCA Project Setup &copy; MERN Stack Training Application.</p>
            </div>
        </footer>
    );
};

export default Footer;
