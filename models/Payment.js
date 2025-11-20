const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
    {
        student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        studentFee: { type: mongoose.Schema.Types.ObjectId, ref: "StudentFee", required: true },
        amountPaid: { type: Number, required: true },
        paymentMethod: { type: String, default: "manual" },    // cash / bank / momo
        reference: { type: String }                            // transaction ID
    },
    { timestamps: true }
);

module.exports = mongoose.model("Payment", PaymentSchema);
