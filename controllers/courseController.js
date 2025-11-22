const Course = require("../models/Course");

// ➤ Create a new course (Admin only)
exports.createCourse = async (req, res) => {
    try {
        const { title, code, description, credits, instructor } = req.body;

        // Validate required fields
        if (!title || !code || !description || !credits || !instructor) {
            return res.status(400).json({ ok: false, message: "All fields are required" });
        }

        const course = await Course.create({ title, code, description, credits, instructor });
        res.status(201).json({ ok: true, body: course });

    } catch (err) {
        console.error(err);
        res.status(500).json({ ok: false, message: "Server error" });
    }
};

// ➤ Get all courses
exports.getCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.json({ ok: true, body: courses });
    } catch (err) {
        console.error(err);
        res.status(500).json({ ok: false, message: "Server error" });
    }
};

// ➤ Delete a course (Admin only)
exports.deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await Course.findByIdAndDelete(id);
        if (!course) return res.status(404).json({ ok: false, message: "Course not found" });
        res.json({ ok: true, message: "Course deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ ok: false, message: "Server error" });
    }
};

// ➤ Update a course (Admin only)
exports.updateCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await Course.findByIdAndUpdate(id, req.body, { new: true });
        if (!course) return res.status(404).json({ ok: false, message: "Course not found" });
        res.json({ ok: true, body: course });
    } catch (err) {
        console.error(err);
        res.status(500).json({ ok: false, message: "Server error" });
    }
};