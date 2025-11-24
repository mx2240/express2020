// routes/enrollmentRoutes.js
const express = require("express");
const router = express.Router();

const {
    enrollStudent,
    getAllEnrollments,
    getEnrollmentById,
    updateEnrollment,
    deleteEnrollment,
    getMyEnrollments,
} = require("../controllers/enrollmentController");

const {
    verifyToken,
    verifyAdmin,
    verifyStudent
} = require("../middleware/authMiddleware");

// =========================
// ⭐ STUDENT ROUTES
// =========================

// Student enrolls in a course
router.post("/enroll", verifyToken, enrollStudent);

// Student views own enrollments
router.get("/my-enrollments", verifyToken, verifyStudent, getMyEnrollments);

// =========================
// ⭐ ADMIN ROUTES
// =========================

// Get all enrollments
router.get("/", verifyToken, verifyAdmin, getAllEnrollments);

// Get a specific enrollment
router.get("/:id", verifyToken, verifyAdmin, getEnrollmentById);

// Update an enrollment
router.put("/:id", verifyToken, verifyAdmin, updateEnrollment);

// Delete an enrollment
router.delete("/:id", verifyToken, verifyAdmin, deleteEnrollment);

module.exports = router;
