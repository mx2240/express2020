const mongoose = require("mongoose")


const ImageModelSchema  = new mongoose.Schema({

  originalName: String,
  fileName: String,
  path: String,
  url: String,
  size: Number,
  mimetype: String,
  uploadedAt: {
    type: Date,
    default: Date.now
  }

})


module.exports = mongoose.model("ImageModel",ImageModelSchema);