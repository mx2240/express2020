const mongoose = require("mongoose");

const InquirySchema = new mongoose.Schema(
    {
        sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        senderName: { type: String },
        message: { type: String, required: true },
        solved: { type: Boolean, default: false },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Inquiry", InquirySchema);
