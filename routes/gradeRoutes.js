
/*************  ✨ Windsurf Command ⭐  *************/
const express = require("express");
const router = express.Router();
const { assignGrade, getStudentGrades } = require("../controllers/gradeController");

router.post("/assign", assignGrade);
router.get("/student/:studentId", getStudentGrades);

module.exports = router;
