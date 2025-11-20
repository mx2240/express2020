const Hostel = require("../models/Hostel");
const Room = require("../models/Room");
const Student = require("../models/Student");

// =============================================
// CREATE HOSTEL (Admin)
// =============================================
exports.createHostel = async (req, res) => {
    try {
        const hostel = await Hostel.create(req.body);
        return res.status(201).json({ message: "Hostel created", hostel });
    } catch (error) {
        console.error("createHostel error:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

// =============================================
// CREATE ROOM (Admin)
// =============================================
exports.createRoom = async (req, res) => {
    try {
        const room = await Room.create(req.body);
        return res.status(201).json({ message: "Room created", room });
    } catch (error) {
        console.error("createRoom error:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

// =============================================
// ASSIGN STUDENT TO ROOM
// =============================================
exports.assignStudent = async (req, res) => {
    try {
        const { studentId, roomId } = req.body;

        const room = await Room.findById(roomId);
        if (!room) return res.status(404).json({ message: "Room not found" });

        if (room.occupants.length >= room.capacity) {
            return res.status(400).json({ message: "Room is full" });
        }

        // Prevent duplicate assignment
        if (room.occupants.includes(studentId)) {
            return res.status(400).json({ message: "Student already assigned" });
        }

        room.occupants.push(studentId);
        await room.save();

        return res.json({ message: "Student assigned successfully", room });
    } catch (error) {
        console.error("assignStudent error:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

// =============================================
// REMOVE STUDENT FROM ROOM
// =============================================
exports.removeStudent = async (req, res) => {
    try {
        const { studentId, roomId } = req.body;

        const room = await Room.findById(roomId);
        if (!room) return res.status(404).json({ message: "Room not found" });

        room.occupants = room.occupants.filter(id => id.toString() !== studentId);
        await room.save();

        return res.json({ message: "Student removed successfully", room });
    } catch (error) {
        console.error("removeStudent error:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

// =============================================
// VIEW ALL HOSTELS
// =============================================
exports.getHostels = async (req, res) => {
    try {
        const hostels = await Hostel.find();
        return res.json(hostels);
    } catch (error) {
        console.error("getHostels error:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

// =============================================
// VIEW ROOMS IN A HOSTEL
// =============================================
exports.getHostelRooms = async (req, res) => {
    try {
        const hostelId = req.params.hostelId;

        const rooms = await Room.find({ hostel: hostelId })
            .populate("occupants", "name email");

        return res.json(rooms);
    } catch (error) {
        console.error("getHostelRooms error:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};
