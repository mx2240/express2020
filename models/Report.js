const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        recipient: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: "recipientModel" },
        recipientModel: { type: String, required: true, enum: ["Student", "Parent"] },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Report", reportSchema);
