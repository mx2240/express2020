const express = require("express");
const router = express.Router();
const { getCourses, createCourse, deleteCourse } = require("../controllers/courseController");
const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");

// Admin: Create course
router.post("/", verifyToken, verifyAdmin, createCourse);

// Get all courses
router.get("/", verifyToken, getCourses);

// Admin: Delete course
router.delete("/:id", verifyToken, verifyAdmin, deleteCourse);

module.exports = router;
