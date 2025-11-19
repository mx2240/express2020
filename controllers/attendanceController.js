const Attendance = require("../models/Attendance");

// ✅ Mark attendance (Admin/Teacher)
const markAttendance = async (req, res) => {
    try {
        const { student, course, date, status, remarks } = req.body;

        if (!student || !course || !date) {
            return res.status(400).json({ message: "Student, course, and date are required" });
        }

        const attendance = await Attendance.create({ student, course, date, status, remarks });
        return res.status(201).json({ message: "Attendance marked successfully", attendance });
    } catch (error) {
        console.error("markAttendance error:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

// ✅ Get attendance for a student
const getStudentAttendance = async (req, res) => {
    try {
        const studentId = req.params.studentId;
        const records = await Attendance.find({ student: studentId })
            .populate("course", "title")
            .sort({ date: -1 });

        return res.json(records);
    } catch (error) {
        console.error("getStudentAttendance error:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

// ✅ Get attendance for a course (Admin/Teacher)
const getCourseAttendance = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const records = await Attendance.find({ course: courseId })
            .populate("student", "name email")
            .sort({ date: -1 });

        return res.json(records);
    } catch (error) {
        console.error("getCourseAttendance error:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = {
    markAttendance,
    getStudentAttendance,
    getCourseAttendance
};
