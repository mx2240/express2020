const BusAttendance = require("../models/BusAttendance");
const Student = require("../models/Student");
const Bus = require("../models/Bus");

// ==============================
// Mark Attendance (Admin Only)
// ==============================
exports.markAttendance = async (req, res) => {
    try {
        const { student, bus, status, date, remarks } = req.body;

        // Validate required fields
        if (!student || !bus || !status) {
            return res.status(400).json({ message: "Student, bus, and status are required" });
        }

        if (!["present", "absent"].includes(status)) {
            return res.status(400).json({ message: "Status must be 'present' or 'absent'" });
        }

        // Normalize date (default today)
        const attendanceDate = date ? new Date(date) : new Date();
        attendanceDate.setHours(0, 0, 0, 0);

        // Prevent duplicate attendance for the same student/bus/date
        const existing = await BusAttendance.findOne({
            student,
            bus,
            date: attendanceDate
        });

        if (existing) {
            return res.status(400).json({ message: "Attendance already marked for this student today" });
        }

        const attendance = await BusAttendance.create({
            student,
            bus,
            status,
            date: attendanceDate,
            remarks: remarks || ""
        });

        const populated = await attendance.populate("student", "name email");

        return res.status(201).json({
            message: "Attendance marked successfully",
            attendance: populated
        });
    } catch (err) {
        console.error("markAttendance error:", err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};

// ==============================
// Get Bus Attendance for a Date
// ==============================
exports.getBusAttendance = async (req, res) => {
    try {
        const { bus, date } = req.query;

        if (!bus) return res.status(400).json({ message: "Bus ID is required" });

        const queryDate = date ? new Date(date) : new Date();
        queryDate.setHours(0, 0, 0, 0);

        const nextDate = new Date(queryDate);
        nextDate.setDate(nextDate.getDate() + 1);

        const records = await BusAttendance.find({
            bus,
            date: { $gte: queryDate, $lt: nextDate }
        }).populate("student", "name email");

        return res.json(records);
    } catch (err) {
        console.error("getBusAttendance error:", err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};

// ==============================
// Get Student Attendance History
// ==============================
exports.getStudentAttendance = async (req, res) => {
    try {
        const { student } = req.params;

        if (!student) return res.status(400).json({ message: "Student ID is required" });

        const records = await BusAttendance.find({ student })
            .populate("bus", "busNumber")
            .sort({ date: -1 });

        return res.json(records);
    } catch (err) {
        console.error("getStudentAttendance error:", err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};
