const Grade = require("../models/Grade");
const User = require("../models/User");
const Course = require("../models/Course");

// Convert numeric score to letter grade
function calculateGrade(score) {
    if (score >= 80) return "A";
    if (score >= 70) return "B";
    if (score >= 60) return "C";
    if (score >= 50) return "D";
    if (score >= 40) return "E";
    return "F";
}

// ADMIN/TEACHER: Assign Grade
exports.assignGrade = async (req, res) => {
    try {
        const { studentId, courseId, score, remarks } = req.body;

        if (!studentId || !courseId || score === undefined) {
            return res.status(400).json({ message: "Missing fields" });
        }

        const student = await User.findById(studentId);
        const course = await Course.findById(courseId);

        if (!student) return res.status(404).json({ message: "Student not found" });
        if (!course) return res.status(404).json({ message: "Course not found" });

        const gradeLetter = calculateGrade(score);

        const grade = await Grade.create({
            student: studentId,
            course: courseId,
            score,
            grade: gradeLetter,
            remarks
        });

        res.json({ message: "Grade assigned successfully", grade });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ADMIN: Get all grades
exports.getAllGrades = async (req, res) => {
    try {
        const grades = await Grade.find()
            .populate("student", "name email")
            .populate("course", "title code");

        res.json(grades);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// STUDENT: Get own grades
exports.getStudentGrades = async (req, res) => {
    try {
        const studentId = req.user.id;

        const grades = await Grade.find({ student: studentId })
            .populate("course", "title code");

        res.json(grades);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
