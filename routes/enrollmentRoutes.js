// routes/enrollmentRoutes.js
const express = require("express");
const router = express.Router();
const {
    enrollStudent,
    dropCourse,
    getMyCourses,
    getAllEnrollments,
    adminEnroll
} = require("../controllers/enrollmentController");

const { verifyToken, verifyStudent, verifyAdmin } = require("../middleware/authMiddleware");

// Student endpoints
router.post("/enroll/:courseId", verifyToken, verifyStudent, enrollStudent);
router.post("/drop/:courseId", verifyToken, verifyStudent, dropCourse);
router.get("/my-courses", verifyToken, verifyStudent, getMyCourses);

// Admin endpoints
router.get("/", verifyToken, verifyAdmin, getAllEnrollments);
router.post("/admin/enroll", verifyToken, verifyAdmin, adminEnroll);

module.exports = router;
