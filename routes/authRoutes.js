const express = require("express");
const router = express.Router();

const {
    registerUser,
    loginUser,
    getUsers
} = require("../controllers/authController");

const {
    verifyToken,
    verifyAdmin
} = require("../middleware/authMiddleware");

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Admin: get all users
router.get("/users", verifyToken, verifyAdmin, getUsers);

module.exports = router;
