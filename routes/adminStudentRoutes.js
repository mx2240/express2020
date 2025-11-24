// routes/adminStudentRoutes.js
const express = require("express");
const router = express.Router();
const {
    listStudents,
    listAllStudents,
    getStudent,
    createStudent,
    updateStudent,
    deleteStudent
} = require("../controllers/adminStudentController");

const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");

// Paginated
router.get("/", verifyToken, verifyAdmin, listStudents);

// Flat list for dropdownss
router.get("/all", verifyAdmin, verifyToken, listAllStudents);

// CRUD
router.get("/:id", verifyToken, verifyAdmin, getStudent);
router.post("/", verifyToken, verifyAdmin, createStudent);
router.put("/:id", verifyToken, verifyAdmin, updateStudent);
router.delete("/:id", verifyToken, verifyAdmin, deleteStudent);

module.exports = router;




