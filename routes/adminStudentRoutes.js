const express = require("express");
const router = express.Router();
const {
    listStudents,
    getStudent,
    createStudent,
    updateStudent,
    deleteStudent
} = require("../controllers/adminStudentController");

const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");
const { validateStudent } = require("../middleware/validators");

// Optional: we'll add validation middleware below; for now protect routes
router.get("/", verifyToken, verifyAdmin, listStudents);
router.get("/:id", verifyToken, verifyAdmin, getStudent);
router.post("/", verifyToken, verifyAdmin, validateStudent, createStudent);
router.put("/:id", verifyToken, verifyAdmin, validateStudent, updateStudent);

router.delete("/:id", verifyToken, verifyAdmin, deleteStudent);

module.exports = router;
