const mongoose = require("mongoose");

const AdminSettingsSchema = new mongoose.Schema({
    notifications: {
        type: Boolean,
        default: true,
    },
    darkMode: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

module.exports = mongoose.model("AdminSettings", AdminSettingsSchema);
