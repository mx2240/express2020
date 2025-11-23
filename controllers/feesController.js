const Fee = require("../models/Fee");
const FeeAssignment = require("../models/FeeAssignment");
const Student = require("../models/Student");

// Create fee
exports.createFee = async (req, res) => {
    try {
        const fee = await Fee.create(req.body);
        res.status(201).json(fee);
    } catch (err) {
        res.status(500).json({ message: "Failed to create fee", error: err.message });
    }
};

// Get all fees
exports.getFees = async (req, res) => {
    try {
        const fees = await Fee.find();
        res.json(fees);
    } catch (err) {
        res.status(500).json({ message: "Failed to get fees", error: err.message });
    }
};

// Assign fee to student
exports.assignFeeToStudent = async (req, res) => {
    try {
        const { studentId, feeId } = req.body;
        if (!studentId || !feeId) return res.status(400).json({ message: "Missing studentId or feeId" });

        const student = await Student.findById(studentId);
        if (!student) return res.status(404).json({ message: "Student not found" });

        const fee = await Fee.findById(feeId);
        if (!fee) return res.status(404).json({ message: "Fee not found" });

        const assignment = await FeeAssignment.create({ student: studentId, fee: feeId, status: "unpaid" });
        res.status(201).json(assignment);
    } catch (err) {
        res.status(500).json({ message: "Failed to assign fee", error: err.message });
    }
};

// Get all assigned fees
exports.getAssignedFees = async (req, res) => {
    try {
        const assignments = await FeeAssignment.find()
            .populate("student", "name email")
            .populate("fee", "title amount description")
            .lean();
        res.json(assignments);
    } catch (err) {
        res.status(500).json({ message: "Failed to get assigned fees", error: err.message });
    }
};

// Mark fee as paid
exports.markPaid = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await FeeAssignment.findByIdAndUpdate(id, { status: "paid" }, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: "Failed to mark fee as paid", error: err.message });
    }
};

// Delete fee
exports.deleteFee = async (req, res) => {
    try {
        const { id } = req.params;
        await Fee.findByIdAndDelete(id);
        res.json({ message: "Fee deleted" });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete fee", error: err.message });
    }
};
