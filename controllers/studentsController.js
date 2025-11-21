// const Enrollment = require("../models/Enrollment");
// const Course = require("../models/Course");
// const Student = require("../models/user");

// exports.getStudentDashboard = async (req, res) => {
//     try {
//         const studentId = req.user.id;

//         // Get student data
//         const student = await Student.findById(studentId).select("-password");

//         // Get student's enrolled courses
//         const enrollments = await Enrollment.find({ student: studentId }).populate("course");

//         res.json({
//             message: "Student dashboard loaded",
//             student,
//             enrolledCourses: enrollments.map(en => ({
//                 courseId: en.course._id,
//                 title: en.course.title,
//                 instructor: en.course.instructor,
//                 credits: en.course.credits,
//                 enrolledAt: en.createdAt
//             }))
//         });

//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };


const Student = require("../models/Student");

exports.createStudent = async (req, res) => {
    try {
        const { name, email, phone, course } = req.body;
        if (!name || !email) return res.status(400).json({ message: "Name & email required" });
        const existing = await Student.findOne({ email });
        if (existing) return res.status(400).json({ message: "Email exists" });
        const student = await Student.create({ name, email, phone, course });
        res.status(201).json(student);
    } catch (err) {
        console.error(err); res.status(500).json({ message: "Server error" });
    }
};

exports.getStudents = async (req, res) => {
    try {
        const list = await Student.find().populate("course", "title");
        res.json(list);
    } catch (err) { res.status(500).json({ message: "Server error" }); }
};