const User = require("../models/User");
const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");

// 📌 Get all students
exports.getAllStudents = async (req, res) => {
    try {
        const students = await User.find({ role: "student" }).select("-password");
        res.status(200).json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 📌 Get all courses
exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 📌 Create a new course
exports.createCourse = async (req, res) => {
    try {
        const { title, description, instructor } = req.body;

        const course = await Course.create({ title, description, instructor });

        res.status(201).json({ message: "Course created successfully", course });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 📌 Delete course
exports.deleteCourse = async (req, res) => {
    try {
        const courseId = req.params.id;

        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ message: "Course not found" });

        await course.deleteOne();

        res.json({ message: "Course deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 📌 View all enrollments
exports.getAllEnrollments = async (req, res) => {
    try {
        const enrollments = await Enrollment.find()
            .populate("student", "name email")
            .populate("course", "title description");

        res.status(200).json(enrollments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 📌 Admin statistics
exports.getAdminStats = async (req, res) => {
    try {
        const studentCount = await User.countDocuments({ role: "student" });
        const courseCount = await Course.countDocuments();
        const enrollmentCount = await Enrollment.countDocuments();

        res.json({
            students: studentCount,
            courses: courseCount,
            enrollments: enrollmentCount,
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
