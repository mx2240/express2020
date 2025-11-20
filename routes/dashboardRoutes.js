const express = require("express");
const router = express.Router();
const {
    getStudentDashboard,
    getAdminDashboard
} = require("../controllers/dashboardController");

const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");

// ✅ Student dashboard (student must be logged in)
router.get("/student", verifyToken, getStudentDashboard);

// 🔒 Admin dashboard (admin only)
router.get("/admin", verifyToken, verifyAdmin, getAdminDashboard);

module.exports = router;
