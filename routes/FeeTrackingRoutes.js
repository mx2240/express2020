const express = require("express");
const router = express.Router();
const FeeRecord = require("../models/FeeRecord");
const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");

// GET ALL RECORDS
router.get("/records", verifyToken, verifyAdmin, async (req, res) => {
    const records = await FeeRecord.find().populate("student").populate("fee");
    res.json(records);
});

// UPDATE STATUS
router.put("/status/:id", verifyToken, verifyAdmin, async (req, res) => {
    await FeeRecord.findByIdAndUpdate(req.params.id, { status: req.body.status });
    res.json({ message: "Status updated" });
});

module.exports = router;

