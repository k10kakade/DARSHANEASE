import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/login", { email, password });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setMessage(data.message || "Login successful");
      setError(false);

      setTimeout(() => {
        setLoading(false);
        navigate("/");
        window.location.reload();
      }, 1000);

    } catch (err) {
      setLoading(false);
      setError(true);
      setMessage(err.response?.data?.message || "Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <h2>🙏 Devotee Login</h2>
        {message && (
          <div className={`message ${error ? "error" : "success"}`}>
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Verifying..." : "Login to DarshanEase"}
          </button>
        </form>
        <p className="form-link">
          New devotee? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;