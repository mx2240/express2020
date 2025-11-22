
const mongoose = require("mongoose");

const FeeSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        amount: { type: Number, required: true },
        description: { type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Fee", FeeSchema);
