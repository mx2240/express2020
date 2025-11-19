const Notification = require("../models/Notification");
const Report = require("../models/Report");

// -------------------- Create Report --------------------
const createReport = async (req, res) => {
    try {
        const { title, description, recipient, recipientModel } = req.body;
        if (!title || !description || !recipient || !recipientModel) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const report = await Report.create({ title, description, recipient, recipientModel });
        res.status(201).json({ message: "Report created", report });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// -------------------- Send Notification --------------------
const sendNotification = async (req, res) => {
    try {
        const { message, recipient, recipientModel } = req.body;
        if (!message || !recipient || !recipientModel) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const notification = await Notification.create({ message, recipient, recipientModel });
        res.status(201).json({ message: "Notification sent", notification });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// -------------------- Fetch Notifications --------------------
const fetchNotifications = async (req, res) => {
    try {
        const user = req.user;
        const notifications = await Notification.find({
            recipient: user._id,
            recipientModel: user.role === "parent" ? "Parent" : "Student"
        }).sort({ createdAt: -1 });
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// -------------------- Mark Notification as Read --------------------
const markNotificationRead = async (req, res) => {
    try {
        const { id } = req.params;
        const notification = await Notification.findByIdAndUpdate(id, { read: true }, { new: true });
        if (!notification) return res.status(404).json({ message: "Notification not found" });
        res.json({ message: "Notification marked as read", notification });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = {
    createReport,
    sendNotification,
    fetchNotifications,
    markNotificationRead
};
