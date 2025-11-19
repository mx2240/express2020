const Announcement = require("../models/Announcement");

// CREATE ANNOUNCEMENT
const createAnnouncement = async (req, res) => {
    try {
        const { title, message, category, pinned } = req.body;

        if (!title || !message) {
            return res.status(400).json({ message: "Title and message are required" });
        }

        // req.user._id comes from verifyToken middleware
        const announcement = await Announcement.create({
            title,
            message,
            category: category || "General",
            pinned: pinned || false,
            createdBy: req.user._id
        });

        return res.status(201).json({
            message: "Announcement created successfully",
            announcement
        });
    } catch (error) {
        console.error("createAnnouncement error:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

// UPDATE ANNOUNCEMENT
const updateAnnouncement = async (req, res) => {
    try {
        const { title, message, category, pinned } = req.body;

        if (!title || !message) {
            return res.status(400).json({ message: "Title and message are required" });
        }

        const updated = await Announcement.findByIdAndUpdate(
            req.params.id,
            { title, message, category, pinned },
            { new: true, runValidators: true }
        );

        if (!updated) {
            return res.status(404).json({ message: "Announcement not found" });
        }

        return res.json({
            message: "Announcement updated successfully",
            announcement: updated
        });
    } catch (error) {
        console.error("updateAnnouncement error:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

// GET ALL ANNOUNCEMENTS
const getAnnouncements = async (req, res) => {
    try {
        const announcements = await Announcement.find()
            .sort({ createdAt: -1 })
            .populate("createdBy", "name email");

        return res.status(200).json(announcements);
    } catch (error) {
        console.error("getAnnouncements error:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

// GET SINGLE ANNOUNCEMENT
const getAnnouncementById = async (req, res) => {
    try {
        const announcement = await Announcement.findById(req.params.id)
            .populate("createdBy", "name email");

        if (!announcement) {
            return res.status(404).json({ message: "Announcement not found" });
        }

        return res.json(announcement);
    } catch (error) {
        console.error("getAnnouncementById error:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

// DELETE ANNOUNCEMENT
const deleteAnnouncement = async (req, res) => {
    try {
        const deleted = await Announcement.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: "Announcement not found" });
        }

        return res.json({ message: "Announcement deleted successfully" });
    } catch (error) {
        console.error("deleteAnnouncement error:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = {
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
    getAnnouncements,
    getAnnouncementById
};
