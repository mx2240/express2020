const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    grade: {
        type: String,
        required: false
    },
    remarks: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model("Result", resultSchema);
