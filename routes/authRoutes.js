// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user"); // adjust casing to your model

// REGISTER
router.post("/register", async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password) return res.status(400).json({ ok: false, message: "All fields required" });

        const exists = await User.findOne({ email });
        if (exists) return res.status(400).json({ ok: false, message: "Email already exists" });

        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({
            name, email, password: hashed, role: role || "student", isVerified: true
        });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.status(201).json({
            ok: true,
            message: "Registration successful",
            token,
            user: { id: user._id, name: user.name, email: user.email, role: user.role }
        });
    } catch (err) {
        console.error("REGISTER ERROR:", err);
        res.status(500).json({ ok: false, message: "Server error" });
    }
});

// LOGIN
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ ok: false, message: "All fields required" });

        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ ok: false, message: "Invalid credentials" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ ok: false, message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.json({ ok: true, message: "Login successful", token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    } catch (err) {
        console.error("LOGIN ERROR:", err);
        res.status(500).json({ ok: false, message: "Server error" });
    }
});

module.exports = router;
