const mongoose = require("mongoose");

const hostelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        enum: ["boys", "girls", "mixed"],
        default: "mixed"
    },
    description: {
        type: String,
        default: ""
    }
}, { timestamps: true });

module.exports = mongoose.model("Hostel", hostelSchema);
