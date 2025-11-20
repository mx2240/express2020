const Timetable = require("../models/Timetable");

// ✅ Create a schedule
const createSchedule = async (req, res) => {
    try {
        const { course, day, startTime, endTime, classroom, teacher } = req.body;

        if (!course || !day || !startTime || !endTime) {
            return res.status(400).json({ message: "Course, day, start and end times are required" });
        }

        const schedule = await Timetable.create({ course, day, startTime, endTime, classroom, teacher });
        return res.status(201).json({ message: "Schedule created", schedule });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

// ✅ Get all schedules
const getAllSchedules = async (req, res) => {
    try {
        const schedules = await Timetable.find()
            .populate("course", "title")
            .populate("teacher", "name email")
            .sort({ day: 1, startTime: 1 });

        return res.json(schedules);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

// ✅ Get schedule for a specific course
const getCourseSchedule = async (req, res) => {
    try {
        const schedules = await Timetable.find({ course: req.params.courseId })
            .populate("course", "title")
            .populate("teacher", "name")
            .sort({ day: 1, startTime: 1 });

        return res.json(schedules);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { createSchedule, getAllSchedules, getCourseSchedule };
