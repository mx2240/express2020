const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: { type: String, enum: ["admin", "student", "parent"], default: "student" },
    // isVerified: { type: Boolean, default: false },        // email verification
},);



module.exports = mongoose.model("User", userSchema);
