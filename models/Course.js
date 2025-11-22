


// const mongoose = require("mongoose");

// const courseSchema = new mongoose.Schema({
//     title: { type: String, required: true },
//     description: String,
//     duration: String,
// });

// module.exports = mongoose.model("Course", courseSchema);


const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    code: { type: String, required: true },
    description: { type: String, required: true },
    credits: { type: Number, required: true },
    instructor: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Course", courseSchema);
