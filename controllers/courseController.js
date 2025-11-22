const Course = require("../models/Course");

// ➤ Create Course
exports.createCourse = async (req, res) => {
    try {
        const { title, description, duration } = req.body;

        if (!title)
            return res.status(400).json({ ok: false, message: "Title required" });

        const course = await Course.create({ title, description, duration });

        res.status(201).json({ ok: true, body: course });
    } catch (err) {
        console.error(err);
        res.status(500).json({ ok: false, message: "Server error" });
    }
};

// ➤ Get all courses
exports.getCourses = async (req, res) => {
    try {
        const items = await Course.find();
        res.json({ ok: true, body: items });
    } catch (err) {
        res.status(500).json({ ok: false, message: "Server error" });
    }
};
