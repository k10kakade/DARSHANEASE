// ─────────────────────────────────────────────────────────
//  middleware/authMiddleware.js
//  JWT Authentication Middleware for Protected Routes
// ─────────────────────────────────────────────────────────

const jwt = require("jsonwebtoken");
const User = require("../models/user");

/**
 * protect – Middleware to verify JWT token on protected routes.
 *
 * Usage: Add `protect` as the second argument on any route that
 * requires a logged-in user, e.g.:
 *   router.get("/profile/:id", protect, getProfile);
 *
 * The frontend must send the token in the Authorization header:
 *   Authorization: Bearer <token>
 */
const protect = async (req, res, next) => {
    let token;

    // Check if the Authorization header exists and starts with "Bearer"
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            // Extract the token part (after "Bearer ")
            token = req.headers.authorization.split(" ")[1];

            // Verify the token using the JWT secret from .env
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Attach the user (without password) to the request object
            req.user = await User.findById(decoded.id).select("-password");

            if (!req.user) {
                return res.status(401).json({ message: "User not found, token invalid" });
            }

            next(); // Token is valid — proceed to the route handler
        } catch (error) {
            return res.status(401).json({ message: "Not authorized, token failed" });
        }
    }

    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token provided" });
    }
};

/**
 * adminOnly – Middleware to restrict access to admin users only.
 * Must be used AFTER the `protect` middleware.
 *
 * Usage:
 *   router.post("/temples", protect, adminOnly, createTemple);
 */
const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        res.status(403).json({ message: "Access denied: Admins only" });
    }
};

module.exports = { protect, adminOnly };
