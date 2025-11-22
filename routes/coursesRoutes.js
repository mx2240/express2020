const express = require("express");
const router = express.Router();
const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");
const { createCourse, getCourses } = require("../controllers/courseController");

router.post("/", verifyToken, verifyAdmin, createCourse);
router.get("/", verifyToken, getCourses);

module.exports = router;
