const express = require("express");
const router = express.Router();
const { getSettings, updateSettings } = require("../controllers/adminSettingsController");
const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");

// GET current settings
router.get("/", verifyToken, verifyAdmin, getSettings);

// UPDATE settings
router.put("/", verifyToken, verifyAdmin, updateSettings);

module.exports = router;
