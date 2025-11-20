const express = require("express");
const router = express.Router();

const {
    getAllStudents,
    getAllCourses,
    createCourse,
    deleteCourse,
    getAllEnrollments,
    getAdminStats
} = require("../controllers/adminController");

const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");

// 📌 Admin dashboard routes
router.get("/students", verifyToken, verifyAdmin, getAllStudents);
router.get("/courses", verifyToken, verifyAdmin, getAllCourses);
router.post("/courses", verifyToken, verifyAdmin, createCourse);
router.delete("/courses/:id", verifyToken, verifyAdmin, deleteCourse);

router.get("/enrollments", verifyToken, verifyAdmin, getAllEnrollments);

router.get("/stats", verifyToken, verifyAdmin, getAdminStats);

module.exports = router;
