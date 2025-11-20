const Driver = require("../models/Driver");
const Bus = require("../models/Bus");

// CREATE DRIVER
exports.createDriver = async (req, res) => {
    try {
        const { name, phone, licenseNumber, address } = req.body;

        if (!name || !phone || !licenseNumber || !address) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const driver = await Driver.create({ name, phone, licenseNumber, address });
        res.status(201).json({ message: "Driver created", driver });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// GET ALL DRIVERS
exports.getAllDrivers = async (req, res) => {
    try {
        const drivers = await Driver.find();
        res.json(drivers);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// GET SINGLE DRIVER
exports.getDriverById = async (req, res) => {
    try {
        const driver = await Driver.findById(req.params.id);
        if (!driver) return res.status(404).json({ message: "Driver not found" });
        res.json(driver);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// UPDATE DRIVER
exports.updateDriver = async (req, res) => {
    try {
        const driver = await Driver.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!driver) return res.status(404).json({ message: "Driver not found" });
        res.json(driver);
    } catch (err) {
        res.status(400).json({ message: "Unable to update driver", error: err.message });
    }
};

// DELETE DRIVER
exports.deleteDriver = async (req, res) => {
    try {
        const driver = await Driver.findByIdAndDelete(req.params.id);
        if (!driver) return res.status(404).json({ message: "Driver not found" });
        // Optional: remove driver from assigned buses
        await Bus.updateMany({ driver: driver._id }, { driver: null });
        res.json({ message: "Driver deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Unable to delete driver", error: err.message });
    }
};

// ASSIGN DRIVER TO BUS
exports.assignDriverToBus = async (req, res) => {
    try {
        const { driverId, busId } = req.body;
        const bus = await Bus.findById(busId);
        if (!bus) return res.status(404).json({ message: "Bus not found" });

        bus.driver = driverId;
        await bus.save();

        res.json({ message: "Driver assigned to bus", bus });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};
