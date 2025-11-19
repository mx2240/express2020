const mongoose = require("mongoose");

const userSchema = mongoose.Schema({

    username:String,
    email:String,
    password:String

}) // Replace with real DB in production

module.exports = mongoose.model("User",userSchema);