const express = require("express");
const router = express.Router();
const Course = require("../models/Course");
const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");

// CREATE COURSE
router.post("/", verifyToken, verifyAdmin, async (req, res) => {
    try {
        const { title, description, duration } = req.body;

        if (!title || !description || !duration) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newCourse = new Course({ title, description, duration });
        await newCourse.save(); // <- possible failure point
        res.status(201).json(newCourse);
    } catch (err) {
        console.error("Error creating course:", err); // add this
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
