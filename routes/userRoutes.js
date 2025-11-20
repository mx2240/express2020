const express = require("express");
const router = express.Router();

const {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile
} = require("../controllers/userController");

const { verifyToken } = require("../middleware/authMiddleware");

// ===============================
// Public Routes
// ===============================
router.post("/users/register", registerUser);
router.post("/users/login", loginUser);

// ===============================
// Protected Routes
// ===============================
router.get("/users/profile", verifyToken, getUserProfile);
router.put("/users/profile", verifyToken, updateUserProfile);

module.exports = router;
