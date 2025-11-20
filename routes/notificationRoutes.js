const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");

const {
    createReport,
    sendNotification,
    fetchNotifications,
    markNotificationRead
} = require("../controllers/notificationController");

// -------------------- Routes --------------------

// Create report
router.post("/report", verifyToken, createReport);

// Send notification
router.post("/send", verifyToken, sendNotification);

// Get notifications for logged-in user
router.get("/", verifyToken, fetchNotifications);

// Mark notification as read
router.put("/:id/read", verifyToken, markNotificationRead);

module.exports = router;
