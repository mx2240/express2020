const express = require("express");
const router = express.Router();
const Bus = require("../models/Bus");

// CREATE BUS
router.post("/", async (req, res) => {
    try {
        const bus = new Bus(req.body);
        await bus.save();
        res.status(201).json(bus);
    } catch (err) {
        res.status(400).json({ message: "Error creating bus", error: err.message });
    }
});

// GET ALL BUSES
router.get("/", async (req, res) => {
    try {
        const buses = await Bus.find();
        res.json(buses);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

// GET SINGLE BUS
router.get("/:id", async (req, res) => {
    try {
        const bus = await Bus.findById(req.params.id);
        if (!bus) return res.status(404).json({ message: "Bus not found" });

        res.json(bus);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

// UPDATE BUS
router.put("/:id", async (req, res) => {
    try {
        const bus = await Bus.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!bus) return res.status(404).json({ message: "Bus not found" });

        res.json(bus);
    } catch (err) {
        res.status(400).json({ message: "Unable to update bus", error: err.message });
    }
});

// DELETE BUS
router.delete("/:id", async (req, res) => {
    try {
        const bus = await Bus.findByIdAndDelete(req.params.id);
        if (!bus) return res.status(404).json({ message: "Bus not found" });

        res.json({ message: "Bus deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Unable to delete bus", error: err.message });
    }
});

module.exports = router;
