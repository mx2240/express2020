
// const mongoose = require("mongoose");

// const enrollmentSchema = new mongoose.Schema({
//     student: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//         required: true
//     },
//     course: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Course",
//         required: true
//     },
//     date: {
//         type: Date,
//         default: Date.now,
//         required: true
//     }
// }, { timestamps: true });

// module.exports = mongoose.model("Enrollment", enrollmentSchema);



const mongoose = require("mongoose");
const enrollmentSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    enrolledAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model("Enrollment", enrollmentSchema);

