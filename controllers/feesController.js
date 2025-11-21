// // controllers/feesController.js
// const Fee = require("../models/Fee");
// const Student = require("../models/Student");

// // GET all fees
// const getFees = async (req, res) => {
//     try {
//         const fees = await Fee.find();
//         res.json(fees);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Server error" });
//     }
// };

// // ADD new fee
// const addFee = async (req, res) => {
//     try {
//         const { title, amount } = req.body;
//         if (!title || !amount) return res.status(400).json({ message: "All fields required" });

//         const fee = await Fee.create({ title, amount });
//         res.status(201).json(fee);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Server error" });
//     }
// };

// // DELETE fee
// const deleteFee = async (req, res) => {
//     try {
//         const { id } = req.params;
//         await Fee.findByIdAndDelete(id);
//         res.json({ message: "Fee deleted" });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Server error" });
//     }
// };

// // ASSIGN fee to student
// const assignFee = async (req, res) => {
//     try {
//         const { studentId, feeId } = req.body;
//         if (!studentId || !feeId) return res.status(400).json({ message: "Student and Fee required" });

//         const student = await Student.findById(studentId);
//         if (!student) return res.status(404).json({ message: "Student not found" });

//         // Here we assume a `fees` array on student model
//         student.fees = student.fees || [];
//         student.fees.push(feeId);
//         await student.save();

//         res.json({ message: "Fee assigned successfully" });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Server error" });
//     }
// };


// module.exports = { getFees, addFee, deleteFee, assignFee };







const Fee = require("../models/Fee");
const Student = require("../models/Student");
const FeeRecord = require("../models/FeeRecord");

exports.getFees = async (req, res) => {
    try { const fees = await Fee.find(); res.json(fees); }
    catch (err) { res.status(500).json({ message: "Server error" }); }
};

exports.createFee = async (req, res) => {
    try {
        const { title, amount } = req.body;
        if (!title || amount == null) return res.status(400).json({ message: "title & amount required" });
        const fee = await Fee.create({ title, amount });
        res.status(201).json(fee);
    } catch (err) { res.status(500).json({ message: "Server error" }); }
};

exports.deleteFee = async (req, res) => {
    try { await Fee.findByIdAndDelete(req.params.id); res.json({ message: "deleted" }); }
    catch (err) { res.status(500).json({ message: "Server error" }); }
};

// assign fee -> creates FeeRecord and links to student
exports.assignFee = async (req, res) => {
    try {
        const { studentId, feeId } = req.body;
        if (!studentId || !feeId) return res.status(400).json({ message: "studentId & feeId required" });
        const student = await Student.findById(studentId); if (!student) return res.status(404).json({ message: "Student not found" });
        const record = await FeeRecord.create({ student: studentId, fee: feeId, status: "pending" });
        student.fees = student.fees || []; student.fees.push(record._id); await student.save();
        res.status(201).json(record);
    } catch (err) { console.error(err); res.status(500).json({ message: "Server error" }); }
};

exports.getFeeRecords = async (req, res) => {
    try {
        const records = await FeeRecord.find().populate("student", "name email").populate("fee", "title amount");
        res.json(records);
    } catch (err) { res.status(500).json({ message: "Server error" }); }
};

exports.updateFeeStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        if (!["paid", "pending", "unpaid"].includes(status)) return res.status(400).json({ message: "Invalid status" });
        const r = await FeeRecord.findByIdAndUpdate(id, { status }, { new: true }).populate("student fee");
        res.json(r);
    } catch (err) { res.status(500).json({ message: "Server error" }); }
};

