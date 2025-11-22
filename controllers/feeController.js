const Fee = require("../models/Fee");
const AssignedFee = require("../models/FeeAssignment");
const User = require("../models/user");

// Create fee
exports.createFee = async (req, res) => {
    try {
        const { title, amount, description } = req.body;

        if (!title || amount === undefined) {
            return res.status(400).json({ success: false, message: "Title and amount are required" });
        }

        const fee = await Fee.create({ title, amount, description });
        res.json({ success: true, data: fee });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Get all fees
exports.getFees = async (req, res) => {
    try {
        const fees = await Fee.find().sort({ createdAt: -1 });
        res.json(fees);
    } catch (err) {
        res.status(500).json({ message: "Error fetching fees" });
    }
};

// Delete fee
exports.deleteFee = async (req, res) => {
    try {
        await Fee.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "Fee deleted" });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete fee" });
    }
};

// Assign fee to a student
exports.assignFee = async (req, res) => {
    try {
        const { studentId, feeId } = req.body;

        const student = await User.findById(studentId);
        const fee = await Fee.findById(feeId);

        if (!student || !fee) {
            return res.status(404).json({ message: "Student or Fee not found" });
        }

        const exists = await AssignedFee.findOne({ student: studentId, fee: feeId });

        if (exists) return res.status(400).json({ message: "Fee already assigned" });

        const assign = await AssignedFee.create({ student: studentId, fee: feeId });
        res.json({ success: true, data: assign });
    } catch (err) {
        res.status(500).json({ message: "Error assigning fee" });
    }
};

// Get all assigned fees
exports.getAssignedFees = async (req, res) => {
    try {
        const assigned = await AssignedFee.find()
            .populate("student", "name email")
            .populate("fee");

        res.json(assigned);
    } catch (err) {
        res.status(500).json({ message: "Error fetching assigned fees" });
    }
};

// Mark fee as paid
exports.payFee = async (req, res) => {
    try {
        const fee = await AssignedFee.findById(req.params.id);

        if (!fee) return res.status(404).json({ message: "Assigned fee not found" });

        fee.status = "paid";
        await fee.save();

        res.json({ success: true, message: "Payment updated" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
