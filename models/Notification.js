const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
    {
        message: { type: String, required: true },
        recipient: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: "recipientModel" },
        recipientModel: { type: String, required: true, enum: ["Student", "Parent"] },
        read: { type: Boolean, default: false }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);
