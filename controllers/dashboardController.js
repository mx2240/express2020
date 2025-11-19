const User = require("../models/User");
const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");
const Result = require("../models/Result");
const Payment = require("../models/Payment");

// ===============================
// STUDENT DASHBOARD
// ===============================
const getStudentDashboard = async (req, res) => {
    try {
        const studentId = req.user._id;

        // 1️⃣ Enrolled courses
        const enrollments = await Enrollment.find({ student: studentId })
            .populate("course", "title description");

        // 2️⃣ Results
        const results = await Result.find({ student: studentId })
            .populate("course", "title");

        // 3️⃣ Payments
        const payments = await Payment.find({ student: studentId })
            .sort({ createdAt: -1 });

        return res.json({
            message: "Student dashboard fetched successfully",
            data: {
                enrollments,
                results,
                payments
            }
        });
    } catch (error) {
        console.error("getStudentDashboard error:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

// ===============================
// ADMIN DASHBOARD
// ===============================
const getAdminDashboard = async (req, res) => {
    try {
        // 1️⃣ Total users
        const users = await User.find().select("name email role");

        // 2️⃣ Courses
        const courses = await Course.find().select("title description");

        // 3️⃣ All results
        const results = await Result.find()
            .populate("student", "name email")
            .populate("course", "title");

        // 4️⃣ Payments
        const payments = await Payment.find()
            .populate("student", "name email")
            .sort({ createdAt: -1 });

        return res.json({
            message: "Admin dashboard fetched successfully",
            data: {
                users,
                courses,
                results,
                payments
            }
        });
    } catch (error) {
        console.error("getAdminDashboard error:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = {
    getStudentDashboard,
    getAdminDashboard
};
