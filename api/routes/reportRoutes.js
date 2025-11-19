// routes/reportRoutes.js
const express = require("express");
const router = express.Router();
const { createReport, getReports, getReport } = require("../controllers/reportController");
const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");

// Admin can create reports
router.post("/", verifyToken, verifyAdmin, createReport);

// Everyone (with token) can view reports
router.get("/", verifyToken, getReports);
router.get("/:reportId", verifyToken, getReport);

module.exports = router;
