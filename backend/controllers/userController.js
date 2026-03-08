// ─────────────────────────────────────────────────────────
//  controllers/userController.js
//  Handles User Registration and Login logic
// ─────────────────────────────────────────────────────────

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// ── Helper: create a signed JWT token ───────────────────
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },                       // Payload: user's MongoDB ID
    process.env.JWT_SECRET,               // Secret key from .env
    { expiresIn: "7d" }                   // Token valid for 7 days
  );
};

// ────────────────────────────────────────────────────────
//  POST /api/users/register
//  Registers a new user account
// ────────────────────────────────────────────────────────
exports.register = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;

    // 1. Check if all required fields are provided
    if (!name || !email || !password || !phone) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    // 2. Check if a user with this email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // 3. Hash the password before saving (never store plain-text!)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Create the new user in MongoDB
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role: role || "user", // Default role is "user"
    });

    // 5. Respond with user info + JWT token
    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ────────────────────────────────────────────────────────
//  POST /api/users/login
//  Logs in an existing user
// ────────────────────────────────────────────────────────
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if email and password were provided
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide email and password" });
    }

    // 2. Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 3. Compare the entered password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // 4. Respond with user info + JWT token
    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ────────────────────────────────────────────────────────
//  GET /api/users/profile/:id
//  Get a user's profile by their ID
// ────────────────────────────────────────────────────────
exports.getProfile = async (req, res) => {
  try {
    // Find user but do NOT return the password field
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};