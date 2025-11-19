const mongoose = require("mongoose");

const ParentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    relation: { type: String, required: true }, // e.g., Mother, Father
    password: { type: String, required: true },
    role: { type: String, default: "parent" },
    children: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }]
}, { timestamps: true });

module.exports = mongoose.model("Parent", ParentSchema);
