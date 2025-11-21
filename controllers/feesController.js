// controllers/feesController.js
const Fee = require("../models/Fee");
const Student = require("../models/Student");

// GET all fees
const getFees = async (req, res) => {
    try {
        const fees = await Fee.find();
        res.json(fees);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// ADD new fee
const addFee = async (req, res) => {
    try {
        const { title, amount } = req.body;
        if (!title || !amount) return res.status(400).json({ message: "All fields required" });

        const fee = await Fee.create({ title, amount });
        res.status(201).json(fee);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// DELETE fee
const deleteFee = async (req, res) => {
    try {
        const { id } = req.params;
        await Fee.findByIdAndDelete(id);
        res.json({ message: "Fee deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// ASSIGN fee to student
const assignFee = async (req, res) => {
    try {
        const { studentId, feeId } = req.body;
        if (!studentId || !feeId) return res.status(400).json({ message: "Student and Fee required" });

        const student = await Student.findById(studentId);
        if (!student) return res.status(404).json({ message: "Student not found" });

        // Here we assume a `fees` array on student model
        student.fees = student.fees || [];
        student.fees.push(feeId);
        await student.save();

        res.json({ message: "Fee assigned successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};


module.exports = { getFees, addFee, deleteFee, assignFee };
