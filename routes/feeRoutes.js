const express = require("express");
const router = express.Router();

const {
    createFee,
    getAllFees,
    getFeesByStudent,
    getMyFees,
    markAsPaid,
    updateFee,
    deleteFee
} = require("../controllers/feeController");

const { verifyToken, verifyAdmin, verifyStudent } = require("../middleware/authMiddleware");

// =============================================
// ADMIN ROUTES
// =============================================

// Create a fee for a student
router.post("/create", verifyToken, verifyAdmin, createFee);

// Get all fees for all students
router.get("/all", verifyToken, verifyAdmin, getAllFees);

// Get fees for a specific student
router.get("/student/:studentId", verifyToken, verifyAdmin, getFeesByStudent);

// Update a fee
router.put("/update/:feeId", verifyToken, verifyAdmin, updateFee);

// Delete fee
router.delete("/delete/:feeId", verifyToken, verifyAdmin, deleteFee);

// Mark as paid
router.put("/mark-paid/:feeId", verifyToken, verifyAdmin, markAsPaid);

// =============================================
// STUDENT ROUTES
// =============================================

// Student: get their own fees
router.get("/my", verifyToken, verifyStudent, getMyFees);

module.exports = router;
