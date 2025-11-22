const Course = require("../models/Course");

// Create course (Admin only)
exports.createCourse = async (req, res) => {
    try {
        const { title, description, duration } = req.body;
        if (!title) return res.status(400).json({ ok: false, message: "Title required" });

        const course = await Course.create({ title, description, duration });
        res.status(201).json({ ok: true, body: course });
    } catch (err) {
        console.error(err);
        res.status(500).json({ ok: false, message: "Server error" });
    }
};

// Get all courses (Any logged-in user)
exports.getCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.json({ ok: true, body: courses });
    } catch (err) {
        console.error(err);
        res.status(500).json({ ok: false, message: "Server error" });
    }
};

// Delete course (Admin only)
exports.deleteCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        if (!course) return res.status(404).json({ ok: false, message: "Course not found" });
        res.json({ ok: true, message: "Deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ ok: false, message: "Server error" });
    }
};
