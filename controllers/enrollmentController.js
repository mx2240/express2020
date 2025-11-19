// controllers/enrollmentController.js
const Student = require("../models/Student");
const Course = require("../models/Course");
const User = require("../models/User");

/**
 * Student self-enroll in a course
 * POST /enroll/:courseId
 * Access: Student
 */
const enrollStudent = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        if (!courseId) return res.status(400).json({ message: "Missing courseId param" });

        // ensure course exists
        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ message: "Course not found" });

        // req.user may be either decoded object { id, role } (per middleware) or full user doc
        const userId = req.user.id || req.user._id || req.user;

        // find student profile linked to this user
        let student = await Student.findOne({ user: userId });

        // if no student doc, create one automatically
        if (!student) {
            // try fetch basic user info for name/email
            const user = await User.findById(userId).select("name email");
            student = await Student.create({
                user: userId,
                name: user ? user.name : undefined,
                email: user ? user.email : undefined,
                enrolledCourses: []
            });
            console.log("Auto-created Student profile for user:", userId);
        }

        // prevent duplicate
        if (student.enrolledCourses.some(id => id.toString() === courseId)) {
            return res.status(400).json({ message: "Already enrolled in this course" });
        }

        student.enrolledCourses.push(courseId);
        await student.save();

        const populated = await Student.findById(student._id).populate("enrolledCourses", "title code credits instructor");

        return res.status(200).json({ message: `Enrolled in ${course.title}`, student: populated });
    } catch (err) {
        console.error("enrollStudent error:", err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};

/**
 * Student drop a course
 * POST /drop/:courseId
 * Access: Student
 */
const dropCourse = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const userId = req.user.id || req.user._id || req.user;

        let student = await Student.findOne({ user: userId });
        if (!student) return res.status(404).json({ message: "Student profile not found" });

        student.enrolledCourses = student.enrolledCourses.filter(id => id.toString() !== courseId);
        await student.save();

        const populated = await Student.findById(student._id).populate("enrolledCourses", "title code credits instructor");

        return res.status(200).json({ message: "Course dropped successfully", student: populated });
    } catch (err) {
        console.error("dropCourse error:", err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};

/**
 * Get logged-in student's courses
 * GET /my-courses
 * Access: Student
 */
const getMyCourses = async (req, res) => {
    try {
        const userId = req.user.id || req.user._id || req.user;
        const student = await Student.findOne({ user: userId }).populate("enrolledCourses", "title code credits instructor");
        if (!student) return res.status(404).json({ message: "Student profile not found" });
        return res.status(200).json({ enrolledCourses: student.enrolledCourses });
    } catch (err) {
        console.error("getMyCourses error:", err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};

/**
 * Admin: get all students with enrollments
 * GET /
 * Access: Admin
 */
const getAllEnrollments = async (req, res) => {
    try {
        const students = await Student.find()
            .populate("user", "name email")
            .populate("enrolledCourses", "title code credits instructor")
            .select("user name email enrolledCourses");
        return res.status(200).json(students);
    } catch (err) {
        console.error("getAllEnrollments error:", err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};

/**
 * Admin: enroll a specific student into a course
 * POST /admin/enroll
 * body: { studentId, courseId }
 * Access: Admin
 */
const adminEnroll = async (req, res) => {
    try {
        const { studentId, courseId } = req.body;
        if (!studentId || !courseId) return res.status(400).json({ message: "studentId and courseId required" });

        const student = await Student.findById(studentId);
        if (!student) return res.status(404).json({ message: "Student not found" });

        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ message: "Course not found" });

        if (student.enrolledCourses.some(id => id.toString() === courseId)) {
            return res.status(400).json({ message: "Student already enrolled in this course" });
        }

        student.enrolledCourses.push(courseId);
        await student.save();

        const populated = await Student.findById(student._id).populate("enrolledCourses", "title code credits");

        return res.status(200).json({ message: "Student enrolled (admin)", student: populated });
    } catch (err) {
        console.error("adminEnroll error:", err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};

module.exports = {
    enrollStudent,
    dropCourse,
    getMyCourses,
    getAllEnrollments,
    adminEnroll
};
