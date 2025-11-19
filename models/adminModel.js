const mongoose = require("mongoose");


const addSportSchema = mongoose.Schema({
    title: String,
    content: String,
    image: String,
    createdAt: {
        type: Date,
        default: Date.now
    }

 
});     
// Replace with real DB in production
module.exports = mongoose.model("addSport", addSportSchema);