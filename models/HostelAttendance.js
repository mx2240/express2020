const mongoose = require("mongoose");

const HostelAttendanceSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true
    },
    hostel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hostel",
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ["Present", "Absent"],
        default: "Present"
    }
}, { timestamps: true });

module.exports = mongoose.model("HostelAttendance", HostelAttendanceSchema);
