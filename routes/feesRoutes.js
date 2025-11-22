// routes/feesRoutes.js
const express = require("express");
const router = express.Router();
const Fee = require("../models/Fee");
const Student = require("../models/user"); // role: student
const FeeAssignment = require("../models/FeeAssignment"); // new model for assignments
const verifyToken = require("../middleware/authMiddleware");

// Get all assigned fees with student and fee details
router.get("/assigned", verifyToken, async (req, res) => {
    try {
        const assignments = await FeeAssignment.find()
            .populate("student", "name email") // get student name & email
            .populate("fee", "title amount description") // get fee details
            .lean();

        res.json(Array.isArray(assignments) ? assignments : []);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch assignments" });
    }
});

// Assign a fee to a student
router.post("/assign", verifyToken, async (req, res) => {
    const { studentId, feeId } = req.body;

    if (!studentId || !feeId) return res.status(400).json({ message: "Student & Fee required" });

    try {
        const existing = await FeeAssignment.findOne({ student: studentId, fee: feeId });
        if (existing) return res.status(400).json({ message: "Fee already assigned to this student" });

        const assignment = new FeeAssignment({
            student: studentId,
            fee: feeId,
            status: "unpaid",
        });

        await assignment.save();
        res.json({ ok: true, message: "Fee assigned successfully", data: assignment });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to assign fee" });
    }
});

// Mark fee as paid
router.post("/pay/:id", verifyToken, async (req, res) => {
    try {
        const assignment = await FeeAssignment.findById(req.params.id);
        if (!assignment) return res.status(404).json({ message: "Assignment not found" });

        assignment.status = "paid";
        await assignment.save();

        res.json({ ok: true, message: "Marked as paid" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to update status" });
    }
});

module.exports = router;
