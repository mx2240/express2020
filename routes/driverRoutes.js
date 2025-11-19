const express = require("express");
const router = express.Router();
const {
    createDriver,
    getAllDrivers,
    getDriverById,
    updateDriver,
    deleteDriver,
    assignDriverToBus
} = require("../controllers/driverController");

const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");

// =======================
// Admin Only Routes
// =======================

// Create a new driver
router.post("/", verifyToken, verifyAdmin, createDriver);

// Get all drivers
router.get("/", verifyToken, verifyAdmin, getAllDrivers);

// Get a single driver by ID
router.get("/:id", verifyToken, verifyAdmin, getDriverById);

// Update driver
router.put("/:id", verifyToken, verifyAdmin, updateDriver);

// Delete driver
router.delete("/:id", verifyToken, verifyAdmin, deleteDriver);

// Assign driver to a bus
router.post("/assign", verifyToken, verifyAdmin, assignDriverToBus);

module.exports = router;
