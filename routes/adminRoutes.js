// const express = require("express");
// const router = express.Router();

// const {
//     getAllStudents,
//     getAllCourses,
//     createCourse,
//     deleteCourse,
//     getAllEnrollments,
//     getAdminStats
// } = require("../controllers/adminController");

// const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");

// // 📌 Admin dashboard routes
// router.get("/students", verifyToken, verifyAdmin, getAllStudents);
// router.get("/courses", verifyToken, verifyAdmin, getAllCourses);
// router.post("/courses", verifyToken, verifyAdmin, createCourse);
// router.delete("/courses/:id", verifyToken, verifyAdmin, deleteCourse);

// router.get("/enrollments", verifyToken, verifyAdmin, getAllEnrollments);

// router.get("/stats", verifyToken, verifyAdmin, getAdminStats);

// module.exports = router;


const express = require("express");
const router = express.Router();
const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");
const User = require("../models/user");

// ------------------ Get Admin Profile ------------------
router.get("/profile", verifyToken, verifyAdmin, async (req, res) => {
    try {
        const admin = await User.findById(req.user.id).select("-password");
        if (!admin) return res.status(404).json({ ok: false, message: "Admin not found" });

        res.json({ ok: true, body: admin }); // ✅ Always returns object
    } catch (err) {
        res.status(500).json({ ok: false, message: err.message });
    }
});


// ------------------ Get All Students ------------------
router.get("/students", verifyToken, verifyAdmin, async (req, res) => {
    try {
        const students = await User.find({ role: "student" }).select("-password");
        res.json({ ok: true, body: students });
    } catch (err) {
        res.status(500).json({ ok: false, message: err.message });
    }
});

// ------------------ Get All Admins ------------------
router.get("/admins", verifyToken, verifyAdmin, async (req, res) => {
    try {
        const admins = await User.find({ role: "admin" }).select("-password");
        res.json({ ok: true, body: admins });
    } catch (err) {
        res.status(500).json({ ok: false, message: err.message });
    }
});

module.exports = router;

