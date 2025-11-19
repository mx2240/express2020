const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String },
    isbn: { type: String, unique: true },
    copiesAvailable: { type: Number, default: 1 },
    totalCopies: { type: Number, default: 1 }
}, { timestamps: true });

module.exports = mongoose.model("Book", bookSchema);
