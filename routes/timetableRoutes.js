const express = require("express");
const router = express.Router();
const { createSchedule, getAllSchedules, getCourseSchedule } = require("../controllers/timetableController");

// For demo, skipping auth
router.post("/create", createSchedule); // create schedule
router.get("/", getAllSchedules); // all schedules
router.get("/course/:courseId", getCourseSchedule); // schedules by course

module.exports = router;
