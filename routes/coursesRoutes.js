const express = require("express");
const router = express.Router();
const { createCourse, getCourses, deleteCourse } = require("../controllers/courseController");
const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");

// Admin: Create course
router.post("/create", verifyToken, verifyAdmin, createCourse);

// Get all courses (any logged-in user)
router.get("/", verifyToken, getCourses);

// Admin: Delete course
router.delete("/:id", verifyToken, verifyAdmin, deleteCourse);

module.exports = router;
