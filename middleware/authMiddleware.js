// middleware/authMiddleware.js

const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Student = require("../models/Student");

// ---------------------------
// VERIFY TOKEN (for all users)
// ---------------------------
exports.verifyToken = async (req, res, next) => {
    let token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res
            .status(401)
            .json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // contains { id, role }
        next();
    } catch (error) {
        console.error("Token Error:", error);
        return res.status(400).json({ message: "Invalid or expired token" });
    }
};

// ---------------------------
// VERIFY ADMIN
// ---------------------------
exports.verifyAdmin = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Admins only" });
        }

        next();
    } catch (error) {
        console.error("verifyAdmin Error:", error);
        res.status(500).json({ message: "Server error in verifyAdmin" });
    }
};

// ---------------------------
// VERIFY STUDENT
// ---------------------------
exports.verifyStudent = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (req.user.role !== "student") {
            return res.status(403).json({
                message: "Students only can perform this action",
            });
        }

        // Validate student record exists
        const studentProfile = await Student.findOne({ user: req.user.id });

        if (!studentProfile) {
            return res.status(404).json({
                message: "Student profile not found. Contact admin.",
            });
        }

        req.student = studentProfile; // Attach student data
        next();
    } catch (error) {
        console.error("verifyStudent Error:", error);
        res.status(500).json({ message: "Server error in verifyStudent" });
    }
};
