const Fee = require("../models/Fee");
const User = require("../models/User");

// Create fee (Admin only)
exports.createFee = async (req, res) => {
    try {
        const { studentId, amount, term, description } = req.body;

        if (!studentId || !amount || !term) {
            return res.status(400).json({ message: "studentId, amount and term are required" });
        }

        const student = await User.findById(studentId);
        if (!student) return res.status(404).json({ message: "Student not found" });

        const fee = await Fee.create({
            studentId,
            amount,
            term,
            description: description || ""
        });

        res.status(201).json({
            success: true,
            message: "Fee record created",
            fee
        });
    } catch (error) {
        console.log("Fee Create Error:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

// Get all fees
exports.getAllFees = async (req, res) => {
    const fees = await Fee.find().populate("studentId", "name email");
    res.json({ success: true, fees });
};

// Get all fees for a student (Admin)
exports.getFeesByStudent = async (req, res) => {
    const fees = await Fee.find({ studentId: req.params.studentId });
    res.json({ success: true, fees });
};

// Student: get own fees
exports.getMyFees = async (req, res) => {
    const fees = await Fee.find({ studentId: req.user.id });
    res.json({ success: true, fees });
};

// Mark as paid
exports.markAsPaid = async (req, res) => {
    const { method, transactionId } = req.body;

    const fee = await Fee.findById(req.params.feeId);
    if (!fee) return res.status(404).json({ message: "Fee not found" });

    fee.status = "paid";
    fee.paymentMethod = method;
    fee.transactionId = transactionId;

    await fee.save();

    res.json({ success: true, message: "Fee marked as paid", fee });
};

// Update Fee
exports.updateFee = async (req, res) => {
    const fee = await Fee.findByIdAndUpdate(req.params.feeId, req.body, { new: true });
    res.json({ success: true, fee });
};

// Delete fee
exports.deleteFee = async (req, res) => {
    await Fee.findByIdAndDelete(req.params.feeId);
    res.json({ success: true, message: "Fee deleted" });
};
