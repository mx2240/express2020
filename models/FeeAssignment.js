const mongoose = require("mongoose");

const feeAssignmentSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    fee: { type: mongoose.Schema.Types.ObjectId, ref: "Fee", required: true },
    status: { type: String, enum: ["unpaid", "paid"], default: "unpaid" }
}, { timestamps: true });

module.exports = mongoose.model("FeeAssignment", feeAssignmentSchema);
