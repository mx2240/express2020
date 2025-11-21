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



const express = require("express");
const router = express.Router();
const feesCtrl = require("../controllers/feesController");
const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");

router.get("/", verifyToken, feesCtrl.getFees);
router.post("/", verifyToken, verifyAdmin, feesCtrl.createFee);
router.delete("/:id", verifyToken, verifyAdmin, feesCtrl.deleteFee);

router.post("/assign", verifyToken, verifyAdmin, feesCtrl.assignFee);
router.get("/records", verifyToken, verifyAdmin, feesCtrl.getFeeRecords);
router.put("/status/:id", verifyToken, verifyAdmin, feesCtrl.updateFeeStatus);

module.exports = router;

