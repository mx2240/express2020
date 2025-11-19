const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Parent = require("../models/Parent");

// Verify Token
exports.verifyToken = async (req, res, next) => {
    try {
        const header = req.headers['authorization'];
        if (!header || !header.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No token provided" });
        }

        const token = header.split(" ")[1];
        if (!token) return res.status(401).json({ message: "Token missing" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        let user = await User.findById(decoded.id);
        if (!user) user = await Parent.findById(decoded.id);
        if (!user) return res.status(401).json({ message: "User not found" });

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token", error: error.message });
    }
};

// Role-based
exports.verifyAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== "admin") return res.status(403).json({ message: "Admin only" });
    next();
};

exports.verifyParent = (req, res, next) => {
    if (!req.user || req.user.role !== "parent") return res.status(403).json({ message: "Parents only" });
    if (req.params.parentId && req.user._id.toString() !== req.params.parentId)
        return res.status(403).json({ message: "Access denied. Only your own children." });
    next();
};

exports.verifyStudent = (req, res, next) => {
    if (!req.user || req.user.role !== "student") return res.status(403).json({ message: "Students only" });
    next();
};
