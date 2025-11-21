const express = require("express");
const router = express.Router();
const Course = require("../models/Course");
const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");

router.post("/", verifyToken, verifyAdmin, async (req, res) => {
    try {
        const { title, description, duration } = req.body;
        if (!title || !description) {
            return res.status(400).json({ message: "Title and description required" });
        }
        const newCourse = await Course.create({ title, description, duration });
        res.status(201).json(newCourse);
    } catch (err) {
        console.error("Error creating course:", err.message);
        res.status(500).json({ message: "Error creating course" });
    }
});

router.get("/", verifyToken, async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (err) {
        console.error("Error fetching courses:", err.message);
        res.status(500).json({ message: "Error fetching courses" });
    }
});

module.exports = router;
