const Course = require("../models/Course");

// ➤ Create Course
exports.createCourse = async (req, res) => {
    try {
        const { title, description, instructor, credits } = req.body;

        const course = await Course.create({
            title,
            description,
            instructor,
            credits
        });

        res.status(201).json({ message: "Course created successfully", course });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ➤ Get all courses
exports.getCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ➤ Get single course
exports.getCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ message: "Course not found" });

        res.json(course);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
