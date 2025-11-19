const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ========================================
// REGISTER USER
// ========================================
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields required" });
        }

        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashed = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashed,
            role: role || "student"
        });

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

// ========================================
// LOGIN USER (WITH DEBUG LOGS)
// ========================================
exports.loginUser = async (req, res) => {
    console.log("\n====================================");
    console.log("🔐 LOGIN ATTEMPT");
    console.log("====================================");

    try {
        const { email, password } = req.body;

        console.log("📩 Incoming login data:", { email, password });

        const user = await User.findOne({ email });

        if (!user) {
            console.log("❌ No user found with email");
            return res.status(400).json({ message: "Invalid credentials" });
        }

        console.log("👤 User found:", {
            id: user._id,
            email: user.email,
            hashedPassword: user.password
        });

        const isMatch = await bcrypt.compare(password, user.password);

        console.log("🔍 Password match:", isMatch);

        if (!isMatch) {
            console.log("❌ Incorrect password");
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        console.log("🎟️ JWT created:", token);
        console.log("✅ LOGIN SUCCESS");
        console.log("====================================\n");

        return res.json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.log("🔥 LOGIN ERROR:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

// ========================================
// GET ALL USERS (ADMIN ONLY)
// ========================================
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        return res.json(users);
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

// ========================================
// GET USER BY ID (ADMIN ONLY)
// ========================================
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });
        return res.json(user);
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};