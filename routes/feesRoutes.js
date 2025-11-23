const express = require("express");
const router = express.Router();
const Fee = require("../models/Fee");
const FeeAssignment = require("../models/FeeAssignment");
const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");

// -------------------- Create Fee (Admin) --------------------
router.post("/", verifyToken, verifyAdmin, async (req, res) => {
    try {
        const { title, amount, description } = req.body;
        if (!title || !amount) return res.status(400).json({ ok: false, message: "Title & Amount required" });

        const fee = await Fee.create({ title, amount, description });
        res.json({ ok: true, fee });
    } catch (err) {
        console.error(err);
        res.status(500).json({ ok: false, message: "Failed to create fee" });
    }
});

// -------------------- Get All Fees --------------------
router.get("/", verifyToken, verifyAdmin, async (req, res) => {
    try {
        const fees = await Fee.find().lean();
        res.json(Array.isArray(fees) ? fees : []);
    } catch (err) {
        console.error(err);
        res.status(500).json({ ok: false, message: "Failed to fetch fees" });
    }
});

// -------------------- Assign Fee to Student --------------------
router.post("/assign", verifyToken, verifyAdmin, async (req, res) => {
    try {
        const { studentId, feeId } = req.body;
        if (!studentId || !feeId) return res.status(400).json({ ok: false, message: "Student & Fee required" });

        const assignment = await FeeAssignment.create({
            student: studentId,
            fee: feeId,
            status: "pending",
        });

        res.json({ ok: true, assignment });
    } catch (err) {
        console.error(err);
        res.status(500).json({ ok: false, message: "Failed to assign fee" });
    }
});

// -------------------- Get All Assigned Fees --------------------
router.get("/assigned", verifyToken, verifyAdmin, async (req, res) => {
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

// -------------------- Mark Fee Paid --------------------
router.post("/pay/:id", verifyToken, verifyAdmin, async (req, res) => {
    try {
        const assignment = await FeeAssignment.findById(req.params.id);
        if (!assignment) return res.status(404).json({ ok: false, message: "Assignment not found" });

        assignment.status = "paid";
        await assignment.save();

        res.json({ ok: true, assignment });
    } catch (err) {
        console.error(err);
        res.status(500).json({ ok: false, message: "Failed to mark as paid" });
    }
});

// -------------------- Delete Fee --------------------
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
