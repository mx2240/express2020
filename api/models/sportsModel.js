const mongoose = require("mongoose")



const sportsSchema = new mongoose.Schema({

    image:String,
    title:String,
    subtitle:String,
    description:String


})

module.exports =  mongoose.model("Sport",sportsSchema)