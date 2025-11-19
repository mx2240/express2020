const mongoose = require("mongoose");

const StudentFeeSchema = new mongoose.Schema(
    {
        student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        fee: { type: mongoose.Schema.Types.ObjectId, ref: "Fee", required: true },
        amount: { type: Number, required: true },
        status: {
            type: String,
            enum: ["unpaid", "partially_paid", "paid"],
            default: "unpaid"
        },
        totalPaid: { type: Number, default: 0 }
    },
    { timestamps: true }
);

module.exports = mongoose.model("StudentFee", StudentFeeSchema);
