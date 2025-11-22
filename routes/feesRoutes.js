const express = require("express");
const router = express.Router();
const {
    createFee,
    getFees,
    assignFee,
    getAssignedFees,
    payFee,
    deleteFee
} = require("../controllers/feeController");

// Fee CRUD
router.post("/", createFee);
router.get("/", getFees);
router.delete("/:id", deleteFee);

// Fee Assignment
router.post("/assign", assignFee);
router.get("/assigned", getAssignedFees);

// Mark fee as paid
router.post("/pay/:id", payFee);

module.exports = router;
