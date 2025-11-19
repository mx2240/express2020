const express = require("express");
const router = express.Router();

const {
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
    getAnnouncements,
    getAnnouncementById
} = require("../controllers/announcementController");

const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");

// STUDENT + ADMIN
router.get("/", verifyToken, getAnnouncements);
router.get("/:id", verifyToken, getAnnouncementById);

// ADMIN ONLY
router.post("/create", verifyToken, verifyAdmin, createAnnouncement);
router.put("/update/:id", verifyToken, verifyAdmin, updateAnnouncement);
router.delete("/delete/:id", verifyToken, verifyAdmin, deleteAnnouncement);

module.exports = router;
