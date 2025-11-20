const Bus = require("../models/Bus");
const Driver = require("../models/Driver");
const TransportRoute = require("../models/TransportRoute");
const TransportAssignment = require("../models/TransportAssignment");
const Student = require("../models/Student");

// =======================
// CREATE BUS
// =======================
exports.createBus = async (req, res) => {
    try {
        const { busNumber, capacity } = req.body;

        if (!busNumber || !capacity) {
            return res.status(400).json({ message: "Bus number and capacity are required" });
        }

        const bus = await Bus.create({ busNumber, capacity });
        res.status(201).json({ message: "Bus created", bus });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// =======================
// CREATE DRIVER
// =======================
exports.createDriver = async (req, res) => {
    try {
        const driver = await Driver.create(req.body);
        res.status(201).json({ message: "Driver created", driver });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// =======================
// CREATE ROUTE
// =======================
exports.createRoute = async (req, res) => {
    try {
        const route = await TransportRoute.create(req.body);
        res.status(201).json({ message: "Route created", route });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// =======================
// ASSIGN DRIVER TO BUS
// =======================
exports.assignDriver = async (req, res) => {
    try {
        const { busId, driverId } = req.body;

        const bus = await Bus.findByIdAndUpdate(
            busId,
            { driver: driverId },
            { new: true }
        ).populate("driver");

        res.json({ message: "Driver assigned", bus });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// =======================
// ASSIGN ROUTE TO BUS
// =======================
exports.assignRoute = async (req, res) => {
    try {
        const { busId, routeId } = req.body;

        const bus = await Bus.findByIdAndUpdate(
            busId,
            { route: routeId },
            { new: true }
        ).populate("route");

        res.json({ message: "Route assigned", bus });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// =======================
// ASSIGN STUDENT TO BUS
// =======================
exports.assignStudentToBus = async (req, res) => {
    try {
        const { studentId, busId } = req.body;

        const bus = await Bus.findById(busId);
        if (!bus) return res.status(404).json({ message: "Bus not found" });

        const studentCount = await TransportAssignment.countDocuments({ bus: busId });
        if (studentCount >= bus.capacity) {
            return res.status(400).json({ message: "Bus is full" });
        }

        const assignment = await TransportAssignment.create({
            student: studentId,
            bus: busId
        });

        res.json({ message: "Student assigned", assignment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// =======================
// GET ALL BUSES (WITH DETAILS)
// =======================
exports.getAllBuses = async (req, res) => {
    try {
        const buses = await Bus.find()
            .populate("driver")
            .populate("route");

        res.json(buses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// =======================
// GET STUDENTS ASSIGNED TO A BUS
// =======================
exports.getBusStudents = async (req, res) => {
    try {
        const busId = req.params.busId;

        const students = await TransportAssignment.find({ bus: busId })
            .populate("student");

        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
