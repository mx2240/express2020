const express = require("express");
const router = express.Router();
const {
    getAllInquiries,
    updateInquiryStatus,
} = require("../controllers/inquiryController");
const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");

// Admin: view all inquiries
router.get("/", verifyToken, verifyAdmin, getAllInquiries);

// Admin: mark as solved / pending
router.patch("/:id", verifyToken, verifyAdmin, updateInquiryStatus);

module.exports = router;
