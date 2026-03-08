import React from "react";
import { Link } from "react-router-dom";

import heroBg from "../assets/wholetemple.jpg";
import entranceImg from "../assets/entrance.jpg";
import dividerBg from "../assets/maintemple.jpg";
import gallery1 from "../assets/aambabai.jpg";
import gallery2 from "../assets/kirnostav.jpg";
import gallery3 from "../assets/sunray.jpg";
import gallery4 from "../assets/shikhar.jpg";
import gallery5 from "../assets/design.jpg";
import gallery6 from "../assets/rightside.jpg";

const Home = () => {
  return (
    <div>
      {/* 1. Hero Section (Full Background Image) */}
      <section className="hero parallax-bg" style={{ backgroundImage: `url(${heroBg})` }}>
        <div className="hero-overlay"></div>
        <div className="hero-content relative z-10">
          <h1>Welcome to Mahalaxmi Temple Darshan Portal</h1>
          <p>Book your Darshan and experience divine blessings</p>
          <div style={{ marginTop: '2rem' }}>
            <Link to="/book" className="btn-glowing">Book Darshan</Link>
          </div>
        </div>
      </section>

      {/* 2. Temple Information Section (Side-by-side image & text) */}
      <section className="info-section">
        <h2 className="section-title" style={{ textAlign: 'center' }}>About <span>Mahalaxmi Temple Kolhapur</span></h2>
        <div className="info-container-split">
          <div className="info-image">
            <img src={entranceImg} alt="Mahalaxmi Temple Entrance" />
          </div>
          <div className="info-text">
            <div className="info-card-modern">
              <h3>📜 History</h3>
              <p>The Shree Mahalaxmi Temple of Kolhapur is one of the 18 Maha Shakti Peethas. Built in the 7th century by the Chalukya empire, it holds immense spiritual significance where Goddess Mahalaxmi (Ambabai) resides.</p>
            </div>
            <div className="info-card-modern">
              <h3>🏛️ Architecture</h3>
              <p>The temple structure features the majestic Hemadpanthi architectural style built with local black stone. The beautiful mandap contains deeply carved pillars and five towering spires.</p>
            </div>
            <div className="info-card-modern">
              <h3>⏳ Darshan Timings</h3>
              <p>Doors open daily at 04:30 AM. Kakad Aarti at 05:30 AM, Mukha Darshan throughout the day, and Shej Aarti at 10:00 PM.</p>
            </div>
            <div className="info-card-modern">
              <h3>🎊 Kirnotsav Festival</h3>
              <p>The famous Festival of Sun Rays where the sun's rays fall directly on the deity's feet, chest, and face sequentially at sunset around Jan-Feb and November.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Background Image Divider (Parallax scrolling) */}
      <section className="parallax-divider parallax-bg" style={{ backgroundImage: `url(${dividerBg})` }}>
        <div className="hero-overlay"></div>
        <div className="relative z-10 text-center text-white">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#D4AF37', textShadow: '2px 2px 5px rgba(0,0,0,0.9)' }}>Divine Peace & Spirituality</h2>
          <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Seek the blessings of Goddess Ambabai and experience the tranquil harmony of the inner sanctum.</p>
        </div>
      </section>

      {/* 4. Temple Image Gallery */}
      <section className="gallery-section">
        <h2 className="section-title" style={{ textAlign: 'center' }}>Temple <span>Gallery</span></h2>
        <div className="gallery-grid-modern">
          <div className="gallery-item-wrap">
            <img src={gallery1} alt="Kolhapur Mahalaxmi Temple" />
          </div>
          <div className="gallery-item-wrap">
            <img src={gallery2} alt="Kirnostav" />
          </div>
          <div className="gallery-item-wrap">
            <img src={gallery3} alt="Sunrays" />
          </div>
          <div className="gallery-item-wrap">
            <img src={gallery4} alt="Shikhar" />
          </div>
          <div className="gallery-item-wrap">
            <img src={gallery5} alt="Temple Design" />
          </div>
          <div className="gallery-item-wrap">
            <img src={gallery6} alt="Temple Side View" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;