


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
    description: String,
    duration: String
}, { timestamps: true });

module.exports = mongoose.model("Course", courseSchema);
