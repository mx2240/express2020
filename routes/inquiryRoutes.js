const express = require("express");
const router = express.Router();

const {
    createInquiry,
    getInquiries,
    getInquiryById,
    updateInquiryStatus
} = require("../controllers/inquiryController");

const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");

// ✅ Public route: submit inquiry
router.post("/create", createInquiry);

// 🔒 Admin routes: view/manage inquiries
router.get("/", verifyToken, verifyAdmin, getInquiries);
router.get("/:id", verifyToken, verifyAdmin, getInquiryById);
router.put("/update/:id", verifyToken, verifyAdmin, updateInquiryStatus);

module.exports = router;
