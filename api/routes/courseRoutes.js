const express = require("express");
const router = express.Router();
const { createCourse, getCourses, getCourse } = require("../controllers/courseController");
const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");

// ➤ Create a course (Admin only)
router.post("/create", verifyToken, verifyAdmin, createCourse);

// ➤ Get all courses
router.get("/", getCourses);

// ➤ Get single course by ID
router.get("/:id", getCourse);

module.exports = router;
