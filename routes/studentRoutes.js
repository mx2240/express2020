const express = require("express");
const router = express.Router();

const { verifyToken, verifyStudent } = require("../middleware/authMiddleware");
const { getStudentDashboard } = require("../controllers/studentController");

// Student dashboard
router.get("/dashboard", verifyToken, verifyStudent, getStudentDashboard);

module.exports = router;
