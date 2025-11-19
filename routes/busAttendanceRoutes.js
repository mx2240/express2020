const express = require("express");
const router = express.Router();
const {
    markAttendance,
    getBusAttendance,
    getStudentAttendance
} = require("../controllers/busAttendanceController");

const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");

// Admin marks attendance
// router.post("/mark", verifyToken, verifyAdmin, markAttendance);
// Add this line in routes/busAttendanceRoutes.js
router.post("/bus", verifyToken, verifyAdmin, markAttendance);


// Get attendance for a bus on a specific date
router.get("/bus", verifyToken, verifyAdmin, getBusAttendance);

// Get student attendance history
router.get("/student/:student", verifyToken, verifyAdmin, getStudentAttendance);

module.exports = router;
