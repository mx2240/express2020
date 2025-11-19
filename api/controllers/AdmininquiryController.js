const Inquiry = require("../models/Inquiry");

// Get all inquiries
exports.getAllInquiries = async (req, res) => {
    try {
        const inquiries = await Inquiry.find().sort({ createdAt: -1 });
        res.json(inquiries);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Update solved status
exports.updateInquiryStatus = async (req, res) => {
    try {
        const { solved } = req.body;
        const inquiry = await Inquiry.findByIdAndUpdate(
            req.params.id,
            { solved },
            { new: true }
        );
        if (!inquiry) return res.status(404).json({ message: "Inquiry not found" });
        res.json(inquiry);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};
