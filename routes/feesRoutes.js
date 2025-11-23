// routes/feesRoutes.js
const express = require("express");
const router = express.Router();
const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");
const {
    createFee,
    getFees,
    assignFeeToStudent,
    getAssignedFees,
    markPaid,
    deleteFee
} = require("../controllers/feesController");

router.post("/", verifyToken, verifyAdmin, createFee);
router.get("/", verifyToken, verifyAdmin, getFees);
router.post("/assign", verifyToken, verifyAdmin, assignFeeToStudent);
router.get("/assigned", verifyToken, verifyAdmin, getAssignedFees);
router.post("/pay/:id", verifyToken, verifyAdmin, markPaid);
router.delete("/:id", verifyToken, verifyAdmin, deleteFee);

module.exports = router;
