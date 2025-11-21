const mongoose = require("mongoose");

const feeRecordSchema = mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
    fee: { type: mongoose.Schema.Types.ObjectId, ref: "Fee" },
    status: { type: String, enum: ["paid", "pending", "unpaid"], default: "pending" },
});

module.exports = mongoose.model("FeeRecord", feeRecordSchema);
