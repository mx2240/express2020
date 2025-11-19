const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: {
            type: String,
            enum: ["admin", "student"],
            default: "student"
        }
    },
    { timestamps: true }
);

// ✅ Prevent OverwriteModelError in hot-reloading or serverless environments
const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;
