const mongoose = require("mongoose");

const transportRouteSchema = new mongoose.Schema({
    routeName: { type: String, required: true },
    startPoint: { type: String, required: true },
    endPoint: { type: String, required: true },
    stops: [{ type: String }],
    time: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("TransportRoute", transportRouteSchema);
