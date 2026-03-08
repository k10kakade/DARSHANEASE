import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userStr = localStorage.getItem("user");
  let user = null;
  try {
    user = userStr && userStr !== "undefined" ? JSON.parse(userStr) : null;
  } catch (e) {
    user = null;
  }
  const isAdmin = user && user.role === "admin";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-logo" onClick={() => navigate("/")}>
        <h1>🙏 Mahalaxmi Temple</h1>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/temple-info">Temple Information</Link></li>

        {isAdmin && (
          <li><Link to="/admin" style={{ color: "#d84315", fontWeight: "bold" }}>Admin Panel</Link></li>
        )}

        {token ? (
          <>
            <li><Link to="/book" className="nav-btn">Darshan Booking</Link></li>
            <li><span onClick={handleLogout} style={{ cursor: "pointer", color: "#c62828", fontWeight: "600" }}>Logout {user?.name ? `(${user.name.split(' ')[0]})` : ''}</span></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register" className="nav-btn">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;