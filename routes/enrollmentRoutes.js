const express = require("express");
const router = express.Router();
const { adminEnroll, getAllEnrollments } = require("../controllers/enrollmentController");
const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");

// Admin-only routes
router.post("/admin/enroll", verifyToken, verifyAdmin, adminEnroll);
router.get("/", verifyToken, verifyAdmin, getAllEnrollments);

module.exports = router;
