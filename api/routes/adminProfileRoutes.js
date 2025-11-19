const express = require("express");
const router = express.Router();
const { getProfile, updateProfile, updatePassword } = require("../controllers/adminProfileController");
const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");

// GET profile
router.get("/", verifyToken, verifyAdmin, getProfile);

// UPDATE profile info
router.put("/", verifyToken, verifyAdmin, updateProfile);

// UPDATE password
router.put("/password", verifyToken, verifyAdmin, updatePassword);

module.exports = router;
