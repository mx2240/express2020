// controllers/feesController.js
const Fee = require("../models/Fee");
const FeeAssignment = require("../models/FeeAssignment");
const Student = require("../models/Student");

exports.createFee = async (req, res) => {
    try {
        const { title, amount, description } = req.body;
        if (!title || amount === undefined) return res.status(400).json({ ok: false, message: "Title & amount required" });
        const fee = await Fee.create({ title, amount, description });
        res.json({ ok: true, fee });
    } catch (err) {
        console.error("createFee error:", err);
        res.status(500).json({ ok: false, message: "Failed to create fee" });
    }
};

exports.getFees = async (req, res) => {
    try {
        const fees = await Fee.find().lean();
        res.json(fees);
    } catch (err) {
        console.error("getFees error:", err);
        res.status(500).json({ ok: false, message: "Failed to fetch fees" });
    }
};

exports.assignFeeToStudent = async (req, res) => {
    try {
        const { studentId, feeId } = req.body;
        if (!studentId || !feeId) return res.status(400).json({ ok: false, message: "Student & Fee required" });

        // optional: verify exist
        const student = await Student.findById(studentId);
        const fee = await Fee.findById(feeId);
        if (!student || !fee) return res.status(404).json({ ok: false, message: "Student or Fee not found" });

        const assignment = await FeeAssignment.create({ student: studentId, fee: feeId, status: "pending" });
        const populated = await assignment.populate("student", "name email").populate("fee", "title amount description").execPopulate?.() || await FeeAssignment.findById(assignment._id).populate("student", "name email").populate("fee", "title amount description").lean();

        res.json({ ok: true, assignment: populated });
    } catch (err) {
        console.error("assignFeeToStudent error:", err);
        res.status(500).json({ ok: false, message: "Failed to assign fee" });
    }
};

exports.getAssignedFees = async (req, res) => {
    try {
        const assignments = await FeeAssignment.find().populate("student", "name email").populate("fee", "title amount description").lean();
        res.json(assignments);
    } catch (err) {
        console.error("getAssignedFees error:", err);
        res.status(500).json({ ok: false, message: "Failed to fetch assignments" });
    }
};

exports.markPaid = async (req, res) => {
    try {
        const assignment = await FeeAssignment.findById(req.params.id);
        if (!assignment) return res.status(404).json({ ok: false, message: "Assignment not found" });
        assignment.status = "paid";
        await assignment.save();
        res.json({ ok: true, assignment });
    } catch (err) {
        console.error("markPaid error:", err);
        res.status(500).json({ ok: false, message: "Failed to mark as paid" });
    }
};

exports.deleteFee = async (req, res) => {
    try {
        await Fee.findByIdAndDelete(req.params.id);
        res.json({ ok: true, message: "Fee deleted" });
    } catch (err) {
        console.error("deleteFee error:", err);
        res.status(500).json({ ok: false, message: "Failed to delete fee" });
    }
};
