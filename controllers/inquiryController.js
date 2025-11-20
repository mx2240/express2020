const Inquiry = require("../models/Inquiry");

// ===============================
// Create new inquiry
// ===============================
const createInquiry = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const inquiry = await Inquiry.create({
            name,
            email,
            subject,
            message
        });

        return res.status(201).json({
            message: "Inquiry submitted successfully",
            inquiry
        });
    } catch (error) {
        console.error("createInquiry error:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

// ===============================
// Get all inquiries (admin)
// ===============================
const getInquiries = async (req, res) => {
    try {
        const inquiries = await Inquiry.find().sort({ createdAt: -1 });
        return res.status(200).json(inquiries);
    } catch (error) {
        console.error("getInquiries error:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

// ===============================
// Get single inquiry by ID (admin)
// ===============================
const getInquiryById = async (req, res) => {
    try {
        const inquiry = await Inquiry.findById(req.params.id);
        if (!inquiry) {
            return res.status(404).json({ message: "Inquiry not found" });
        }
        return res.json(inquiry);
    } catch (error) {
        console.error("getInquiryById error:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

// ===============================
// Update inquiry status (admin)
// ===============================
const updateInquiryStatus = async (req, res) => {
    try {
        const { status } = req.body;
        if (!["pending", "resolved"].includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const inquiry = await Inquiry.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!inquiry) {
            return res.status(404).json({ message: "Inquiry not found" });
        }

        return res.json({ message: "Inquiry updated successfully", inquiry });
    } catch (error) {
        console.error("updateInquiryStatus error:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = {
    createInquiry,
    getInquiries,
    getInquiryById,
    updateInquiryStatus
};
