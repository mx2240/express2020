const Enrollment = require("../models/Enrollment");
const Student = require("../models/Student");
const Course = require("../models/Course");

// Admin enroll a student into a course
exports.adminEnroll = async (req, res) => {
    try {
        const { studentId, courseId } = req.body;

        if (!studentId || !courseId) {
            return res.status(400).json({ ok: false, message: "Student and Course are required" });
        }

        // Check if student exists
        const student = await Student.findById(studentId);
        if (!student) return res.status(404).json({ ok: false, message: "Student not found" });

        // Check if course exists
        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ ok: false, message: "Course not found" });

        // Prevent duplicate enrollment
        const exists = await Enrollment.findOne({ student: studentId, course: courseId });
        if (exists) return res.status(400).json({ ok: false, message: "Student already enrolled in this course" });

        // Create enrollment
        const enrollment = await Enrollment.create({ student: studentId, course: courseId });

        res.status(201).json({ ok: true, message: "Enrollment successful", enrollment });
    } catch (err) {
        console.error("adminEnroll error:", err);
        res.status(500).json({ ok: false, message: "Server error", error: err.message });
    }
};

// List all enrollments for admin
exports.getAllEnrollments = async (req, res) => {
    try {
        const enrollments = await Enrollment.find()
            .populate("student", "name email")
            .populate("course", "title code")
            .sort({ createdAt: -1 })
            .lean();

        res.json({ ok: true, enrollments });
    } catch (err) {
        console.error("getAllEnrollments error:", err);
        res.status(500).json({ ok: false, message: "Server error", error: err.message });
    }
};
