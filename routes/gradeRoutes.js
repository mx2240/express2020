const express = require("express");
const router = express.Router();

const {
    assignGrade,
    getAllGrades,
    getStudentGrades
} = require("../controllers/gradeController");

const { verifyToken, verifyAdmin, verifyStudent } = require("../middleware/authMiddleware");

// ADMIN: Assign grade
router.post("/assign", verifyToken, verifyAdmin, assignGrade);

// ADMIN: Get all grades
router.get("/all", verifyToken, verifyAdmin, getAllGrades);

// STUDENT: Get own results
router.get("/student/results", verifyToken, verifyStudent, getStudentGrades);

module.exports = router;
