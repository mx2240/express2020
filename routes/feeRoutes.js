const express = require("express");
const router = express.Router();
const { assignFee, getAllFees, markFeePaid } = require("../controllers/feeController");
const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");

// Assign fee
router.post("/fees/assign", verifyToken, verifyAdmin, assignFee);

// Get all fees
router.get("/fees", verifyToken, verifyAdmin, getAllFees);

// Mark fee as paid
router.patch("/fees/pay/:feeId", verifyToken, verifyAdmin, markFeePaid);

module.exports = router;
