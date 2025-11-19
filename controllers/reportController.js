// controllers/reportController.js
const Report = require("../models/Report");

// Create report
const createReport = async (req, res) => {
    try {
        const { type, title, description, data } = req.body;
        if (!type || !title) {
            return res.status(400).json({ message: "Type and title are required" });
        }

        const report = await Report.create({
            type,
            title,
            description,
            data,
            createdBy: req.user._id
        });

        res.status(201).json({ message: "Report created", report });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get all reports
const getReports = async (req, res) => {
    try {
        const reports = await Report.find().populate("createdBy", "name email").sort({ createdAt: -1 });
        res.json(reports);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get single report
const getReport = async (req, res) => {
    try {
        const report = await Report.findById(req.params.reportId).populate("createdBy", "name email");
        if (!report) return res.status(404).json({ message: "Report not found" });
        res.json(report);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { createReport, getReports, getReport };
