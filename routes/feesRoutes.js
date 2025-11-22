const express = require("express");
const router = express.Router();
const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");
const Fee = require("../models/Fee");
const FeeAssignment = require("../models/FeeAssignment");
const User = require("../models/user");

// ------------------ Create Fee ------------------
router.post("/", verifyToken, verifyAdmin, async (req, res) => {
    try {
        const { title, amount, description } = req.body;
        if (!title || !amount) return res.status(400).json({ ok: false, message: "Title & amount required" });

        const fee = new Fee({ title, amount, description });
        await fee.save();
        res.json({ ok: true, message: "Fee created successfully", fee });
    } catch (err) {
        console.error(err);
        res.status(500).json({ ok: false, message: "Failed to create fee" });
    }
});

// ------------------ Get All Fees ------------------
router.get("/", verifyToken, async (req, res) => {
    try {
        const fees = await Fee.find().lean();
        res.json(Array.isArray(fees) ? fees : []);
    } catch (err) {
        console.error(err);
        res.status(500).json({ ok: false, message: "Failed to fetch fees" });
    }
});

// ------------------ Assign Fee to Student ------------------
router.post("/assign", verifyToken, verifyAdmin, async (req, res) => {
    try {
        const { studentId, feeId } = req.body;
        if (!studentId || !feeId) return res.status(400).json({ ok: false, message: "Student & Fee required" });

        const assignment = new FeeAssignment({
            student: studentId,
            fee: feeId,
            status: "pending",
        });

        await assignment.save();
        res.json({ ok: true, message: "Fee assigned successfully", assignment });
    } catch (err) {
        console.error(err);
        res.status(500).json({ ok: false, message: "Failed to assign fee" });
    }
});

// ------------------ Get Assigned Fees ------------------
router.get("/assigned", verifyToken, async (req, res) => {
    try {
        const assignments = await FeeAssignment.find()
            .populate("student", "name email")
            .populate("fee", "title amount description")
            .lean();

        res.json(Array.isArray(assignments) ? assignments : []);
    } catch (err) {
        console.error(err);
        res.status(500).json({ ok: false, message: "Failed to fetch assignments" });
    }
});

// ------------------ Mark Fee as Paid ------------------
router.post("/pay/:id", verifyToken, verifyAdmin, async (req, res) => {
    try {
        const assignment = await FeeAssignment.findById(req.params.id);
        if (!assignment) return res.status(404).json({ ok: false, message: "Assignment not found" });

        assignment.status = "paid";
        await assignment.save();
        res.json({ ok: true, message: "Marked as paid" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ ok: false, message: "Failed to mark as paid" });
    }
});

// ------------------ Delete Fee ------------------
router.delete("/:id", verifyToken, verifyAdmin, async (req, res) => {
    try {
        await Fee.findByIdAndDelete(req.params.id);
        res.json({ ok: true, message: "Fee deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ ok: false, message: "Failed to delete fee" });
    }
});

module.exports = router;
