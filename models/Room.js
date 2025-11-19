const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
    hostel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hostel",
        required: true
    },
    roomNumber: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true,
        default: 4
    },
    occupants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student"
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model("Room", roomSchema);
