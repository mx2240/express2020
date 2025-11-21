const express = require("express");
const router = express.Router();
const Course = require("../models/Course");
const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");

// CREATE COURSE
router.post("/", verifyToken, verifyAdmin, async (req, res) => {
    try {
        const newCourse = new Course(req.body);
        await newCourse.save();
        res.status(201).json(newCourse);
    } catch (err) {
        res.status(500).json({ message: "Error creating course" });
    }
});

// GET ALL COURSES
router.get("/", verifyToken, async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (err) {
        res.status(500).json({ message: "Error fetching courses" });
    }
});


module.exports = router;
