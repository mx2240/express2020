const mongoose = require("mongoose");

const feeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    description: String
}, { timestamps: true });

module.exports = mongoose.model("Fee", feeSchema);
