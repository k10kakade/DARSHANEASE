// ─────────────────────────────────────────────────────────
//  controllers/templeController.js
//  Handles Temple CRUD operations
// ─────────────────────────────────────────────────────────

const Temple = require("../models/temple");

// ────────────────────────────────────────────────────────
//  POST /api/temples
//  Admin creates a new temple listing
// ────────────────────────────────────────────────────────
exports.createTemple = async (req, res) => {
  try {
    const { templeName, location, description, image, availableSlots, darshanFee } = req.body;

    // Validate required fields
    if (!templeName || !location || !availableSlots || darshanFee === undefined) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    // Create and save temple in MongoDB
    const temple = await Temple.create({
      templeName,
      location,
      description,
      image,
      availableSlots,
      darshanFee,
    });

    res.status(201).json({
      message: "Temple added successfully",
      temple,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ────────────────────────────────────────────────────────
//  GET /api/temples
//  Get list of all temples
// ────────────────────────────────────────────────────────
exports.getTemples = async (req, res) => {
  try {
    const temples = await Temple.find(); // Fetch all temples from DB

    res.status(200).json({
      message: "Temples fetched successfully",
      count: temples.length,
      temples,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ────────────────────────────────────────────────────────
//  GET /api/temples/:id
//  Get details of a single temple by its ID
// ────────────────────────────────────────────────────────
exports.getTempleById = async (req, res) => {
  try {
    const temple = await Temple.findById(req.params.id);

    if (!temple) {
      return res.status(404).json({ message: "Temple not found" });
    }

    res.status(200).json(temple);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ────────────────────────────────────────────────────────
//  PUT /api/temples/:id
//  Admin updates temple details
// ────────────────────────────────────────────────────────
exports.updateTemple = async (req, res) => {
  try {
    const temple = await Temple.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // Return the updated document
    );

    if (!temple) {
      return res.status(404).json({ message: "Temple not found" });
    }

    res.status(200).json({
      message: "Temple updated successfully",
      temple,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ────────────────────────────────────────────────────────
//  DELETE /api/temples/:id
//  Admin deletes a temple listing
// ────────────────────────────────────────────────────────
exports.deleteTemple = async (req, res) => {
  try {
    const temple = await Temple.findByIdAndDelete(req.params.id);

    if (!temple) {
      return res.status(404).json({ message: "Temple not found" });
    }

    res.status(200).json({ message: "Temple deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};