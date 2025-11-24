const Enrollment = require("../models/Enrollment");

// Enroll a student in a course
const enrollStudent = async (req, res) => {
    try {
        const { studentId, courseId } = req.body;

        if (!studentId || !courseId) {
            return res.status(400).json({ message: "Student ID and Course ID are required" });
        }

        const enrollment = await Enrollment.create({
            student: studentId,
            course: courseId,
        });

        res.status(201).json(enrollment);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: "Student already enrolled in this course" });
        }
        res.status(500).json({ message: error.message });
    }
};

// Get all enrollments
const getAllEnrollments = async (req, res) => {
    try {
        const enrollments = await Enrollment.find()
            .populate("student")
            .populate("course");
        res.json(enrollments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get enrollment by ID
const getEnrollmentById = async (req, res) => {
    try {
        const enrollment = await Enrollment.findById(req.params.id)
            .populate("student")
            .populate("course");

        if (!enrollment) {
            return res.status(404).json({ message: "Enrollment not found" });
        }

        res.json(enrollment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update enrollment
const updateEnrollment = async (req, res) => {
    try {
        const enrollment = await Enrollment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!enrollment) {
            return res.status(404).json({ message: "Enrollment not found" });
        }

        res.json(enrollment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete enrollment
const deleteEnrollment = async (req, res) => {
    try {
        const enrollment = await Enrollment.findByIdAndDelete(req.params.id);

        if (!enrollment) {
            return res.status(404).json({ message: "Enrollment not found" });
        }

        res.json({ message: "Enrollment deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get enrollments for logged-in student
const getMyEnrollments = async (req, res) => {
    try {
        const enrollments = await Enrollment.find({ student: req.user.id })
            .populate("course");

        res.json(enrollments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    enrollStudent,
    getAllEnrollments,
    getEnrollmentById,
    updateEnrollment,
    deleteEnrollment,
    getMyEnrollments,
};
