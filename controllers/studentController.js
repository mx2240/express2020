const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");
const Student = require("../models/User");

exports.getStudentDashboard = async (req, res) => {
    try {
        const studentId = req.user.id;

        // Get student data
        const student = await Student.findById(studentId).select("-password");

        // Get student's enrolled courses
        const enrollments = await Enrollment.find({ student: studentId }).populate("course");

        res.json({
            message: "Student dashboard loaded",
            student,
            enrolledCourses: enrollments.map(en => ({
                courseId: en.course._id,
                title: en.course.title,
                instructor: en.course.instructor,
                credits: en.course.credits,
                enrolledAt: en.createdAt
            }))
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
