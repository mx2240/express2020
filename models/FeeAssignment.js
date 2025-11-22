const mongoose = require("mongoose");

const AssignedFeeSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        fee: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Fee",
            required: true,
        },
        status: {
            type: String,
            enum: ["unpaid", "paid"],
            default: "unpaid",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("AssignedFee", AssignedFeeSchema);
