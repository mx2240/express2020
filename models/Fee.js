const mongoose = require("mongoose");

const feeSchema = new mongoose.Schema(
    {
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        term: {
            type: String,
            required: true
        },
        description: {
            type: String,
            default: ""
        },
        status: {
            type: String,
            enum: ["unpaid", "paid"],
            default: "unpaid"
        },
        paymentMethod: {
            type: String,
            default: null
        },
        transactionId: {
            type: String,
            default: null
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Fee", feeSchema);
