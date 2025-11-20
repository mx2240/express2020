const mongoose = require("mongoose");

const timetableSchema = new mongoose.Schema({
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },
    day: {
        type: String,
        enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        required: true
    },
    startTime: {
        type: String, // "08:00"
        required: true
    },
    endTime: {
        type: String, // "10:00"
        required: true
    },
    classroom: {
        type: String
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

module.exports = mongoose.model("Timetable", timetableSchema);
