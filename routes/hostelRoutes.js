const express = require("express");
const router = express.Router();

const {
    createHostel,
    createRoom,
    assignStudent,
    removeStudent,
    getHostels,
    getHostelRooms
} = require("../controllers/hostelController");

const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");

// ADMIN ROUTES
router.post("/hostel", verifyToken, verifyAdmin, createHostel);
router.post("/room", verifyToken, verifyAdmin, createRoom);
router.post("/assign", verifyToken, verifyAdmin, assignStudent);
router.post("/remove", verifyToken, verifyAdmin, removeStudent);

// STUDENT + ADMIN
router.get("/hostels", verifyToken, getHostels);
router.get("/rooms/:hostelId", verifyToken, getHostelRooms);

module.exports = router;
