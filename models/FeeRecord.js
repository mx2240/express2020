// const mongoose = require("mongoose");

// const feeRecordSchema = mongoose.Schema({
//     student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
//     fee: { type: mongoose.Schema.Types.ObjectId, ref: "Fee" },
//     status: { type: String, enum: ["paid", "pending", "unpaid"], default: "pending" },
// });

// module.exports = mongoose.model("FeeRecord", feeRecordSchema);



const mongoose = require("mongoose");
const feeRecordSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    fee: { type: mongoose.Schema.Types.ObjectId, ref: "Fee", required: true },
    status: { type: String, enum: ["paid", "pending", "unpaid"], default: "pending" },
    assignedAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model("FeeRecord", feeRecordSchema);

