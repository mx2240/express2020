const express = require("express");
const router = express.Router();
const {
    createBus,
    createDriver,
    createRoute,
    assignDriver,
    assignRoute,
    assignStudentToBus,
    getAllBuses,
    getBusStudents
} = require("../controllers/transportController");

const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");

// Admin only
router.post("/bus", verifyToken, verifyAdmin, createBus);
router.post("/driver", verifyToken, verifyAdmin, createDriver);
router.post("/route", verifyToken, verifyAdmin, createRoute);
router.post("/assign-driver", verifyToken, verifyAdmin, assignDriver);
router.post("/assign-route", verifyToken, verifyAdmin, assignRoute);
router.post("/assign-student", verifyToken, verifyAdmin, assignStudentToBus);

// Public (Student/Admin)
router.get("/buses", verifyToken, getAllBuses);
router.get("/bus-students/:busId", verifyToken, getBusStudents);

module.exports = router;
