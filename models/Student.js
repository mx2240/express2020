// // models/Student.js
// const mongoose = require("mongoose");

// const studentSchema = new mongoose.Schema({
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",      // links to users collection
//         required: true,
//         unique: true
//     },
//     name: { type: String },
//     email: { type: String },
//     enrolledCourses: [
//         { type: mongoose.Schema.Types.ObjectId, ref: "Course" }
//     ],
//     grades: [
//         {
//             course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
//             score: Number,
//             grade: String
//         }
//     ],
//     feesPaid: { type: Boolean, default: false },
//     balance: { type: Number, default: 0 }
// }, { timestamps: true });

// module.exports = mongoose.model("Student", studentSchema);




// const mongoose = require("mongoose");

// const StudentSchema = new mongoose.Schema({
//     name: { type: String, required: true, trim: true },
//     email: { type: String, required: true, unique: true, lowercase: true, trim: true },
//     studentClass: { type: String, default: "" },
//     phone: { type: String, default: "" },
// }, { timestamps: true });

// module.exports = mongoose.model("Student", StudentSchema);

const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: String,
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    fees: [{ type: mongoose.Schema.Types.ObjectId, ref: "FeeRecord" }]
}, { timestamps: true });

module.exports = mongoose.model("Student", studentSchema);

