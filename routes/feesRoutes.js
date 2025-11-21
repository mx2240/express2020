// routes/feesRoutes.js
const express = require("express");
const router = express.Router();
const { getFees, addFee, deleteFee, assignFee } = require("../controllers/feesController");
const { verifyToken } = require("../middleware/authMiddleware");

// GET all fees
router.get("/", verifyToken, getFees);

// ADD new fee
router.post("/", verifyToken, addFee);

// DELETE fee
router.delete("/:id", verifyToken, deleteFee);

// ASSIGN fee to student
router.post("/assign", verifyToken, assignFee);


module.exports = router;
