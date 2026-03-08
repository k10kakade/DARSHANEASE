import React from "react";
import "../styles/hero.css";

const HeroSection = () => {
    return (
        <div className="hero">
            <div className="hero-overlay">
                <h1>Welcome to Mahalaxmi Temple Darshan Portal</h1>
                <p>Experience divine blessings at Mahalaxmi Temple Kolhapur</p>

                <button className="hero-btn">
                    Book Darshan
                </button>
            </div>
        </div>
    );
};

export default HeroSection;