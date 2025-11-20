const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    instructor: { type: String, required: true },
    credits: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Course", courseSchema);
