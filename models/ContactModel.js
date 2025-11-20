const mongoose = require("mongoose");

const busAttendanceSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: [true, "Student is required"]
    },
    bus: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bus",
        required: [true, "Bus is required"]
    },
    date: {
        type: Date,
        required: [true, "Date is required"],
        default: () => new Date().setHours(0, 0, 0, 0) // defaults to today, normalized
    },
    status: {
        type: String,
        enum: ["present", "absent"],
        required: [true, "Status is required"]
    },
    remarks: {
        type: String,
        default: ""
    }
}, { timestamps: true });

module.exports = mongoose.model("BusAttendance", busAttendanceSchema);
