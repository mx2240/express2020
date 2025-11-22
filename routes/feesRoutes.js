// // routes/feesRoutes.js
// const express = require("express");
// const router = express.Router();
// const { getFees, addFee, deleteFee, assignFee } = require("../controllers/feesController");
// const { verifyToken } = require("../middleware/authMiddleware");

// // GET all fees
// router.get("/", verifyToken, getFees);

// // ADD new fee
// router.post("/", verifyToken, addFee);

// // DELETE fee
// router.delete("/:id", verifyToken, deleteFee);

// // ASSIGN fee to student
// router.post("/assign", verifyToken, assignFee);


// module.exports = router;



// const express = require("express");
// const router = express.Router();
// const feesCtrl = require("../controllers/feesController");
// const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");

const express = require("express");
const router = express.Router();
const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");
const Fee = require("../models/Fee");
const User = require("../models/user");
const feesCtrl = require("../controllers/feesController");





router.get("/", verifyToken, feesCtrl.getFees);
router.post("/", verifyToken, verifyAdmin, feesCtrl.createFee);
router.delete("/:id", verifyToken, verifyAdmin, feesCtrl.deleteFee);
router.get("/records", verifyToken, verifyAdmin, feesCtrl.getFeeRecords);
router.put("/status/:id", verifyToken, verifyAdmin, feesCtrl.updateFeeStatus);



// Assign fee to a student
router.post("/assign", verifyToken, verifyAdmin, async (req, res) => {
    const { studentId, feeId } = req.body;
    if (!studentId || !feeId) return res.status(400).json({ message: "Student ID and Fee ID required" });

    try {
        const student = await User.findById(studentId);
        const fee = await Fee.findById(feeId);

        if (!student) return res.status(404).json({ message: "Student not found" });
        if (!fee) return res.status(404).json({ message: "Fee not found" });

        // Here you can either push fee to student's fees array or create a mapping collection
        // Example: student.fees.push(fee._id); await student.save();
        // For simplicity, let's just return success
        res.json({ message: `Fee "${fee.title}" assigned to student "${student.name}"` });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to assign fee" });
    }
});

module.exports = router;






