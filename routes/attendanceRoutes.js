const express = require("express");
const router = express.Router();
const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");

const {
    markAttendance,
    getStudentAttendance,
    getCourseAttendance
} = require("../controllers/attendanceController");

// Admin/Teacher marks attendance
router.post("/mark", verifyToken, verifyAdmin, markAttendance);

// Get student attendance
router.get("/student/:studentId", verifyToken, getStudentAttendance);

// Get course attendance
router.get("/course/:courseId", verifyToken, verifyAdmin, getCourseAttendance);

module.exports = router;
