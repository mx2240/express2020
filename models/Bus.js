const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
    busNumber: {
        type: String,
        required: true,
        unique: true
    },
    capacity: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["Active", "Under Maintenance", "Inactive"],
        default: "Active"
    },
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Driver",
        default: null
    },
    route: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TransportRoute",
        default: null
    }
}, { timestamps: true });

module.exports = mongoose.model("Bus", busSchema);
