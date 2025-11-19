const Attendance = require("../models/Attendance");
const Grade = require("../models/Grade");
const Fee = require("../models/Fee");
const Report = require("../models/Report");
const Notification = require("../models/Notification");
const Student = require("../models/Student");
const Parent = require("../models/Parent");

// -------------------- Dashboard --------------------
const getDashboard = async (req, res) => {
    try {
        const user = req.user;
        let dashboardData = {};

        if (user.role === "admin") {
            // Admin sees all data
            const totalStudents = await Student.countDocuments();
            const totalParents = await Parent.countDocuments();
            const totalFees = await Fee.countDocuments();
            const totalReports = await Report.countDocuments();
            const totalNotifications = await Notification.countDocuments();

            dashboardData = {
                totalStudents,
                totalParents,
                totalFees,
                totalReports,
                totalNotifications
            };
        }

        if (user.role === "student") {
            const attendance = await Attendance.find({ student: user._id }).populate("course");
            const grades = await Grade.find({ student: user._id }).populate("course");
            const fees = await Fee.find({ student: user._id });
            const reports = await Report.find({ recipient: user._id, recipientModel: "Student" });
            const notifications = await Notification.find({ recipient: user._id, recipientModel: "Student" });

            dashboardData = { attendance, grades, fees, reports, notifications };
        }

        if (user.role === "parent") {
            // Get children first
            const parent = await Parent.findById(user._id).populate("children");
            const childrenIds = parent.children.map(c => c._id);

            const attendance = await Attendance.find({ student: { $in: childrenIds } }).populate("student course");
            const grades = await Grade.find({ student: { $in: childrenIds } }).populate("student course");
            const fees = await Fee.find({ student: { $in: childrenIds } });
            const reports = await Report.find({ recipient: user._id, recipientModel: "Parent" });
            const notifications = await Notification.find({ recipient: user._id, recipientModel: "Parent" });

            dashboardData = { children: parent.children, attendance, grades, fees, reports, notifications };
        }

        res.json({ role: user.role, dashboard: dashboardData });
    } catch (error) {
        console.error("getDashboard error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { getDashboard };
