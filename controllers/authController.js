// controllers/authController.js
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user"); // EXACT casing
const RefreshToken = require("../models/RefreshToken");
const VerificationToken = require("../models/VerificationToken");
const PasswordReset = require("../models/PasswordReset");

// =====================================================
// ► TOKEN HELPERS
// =====================================================
const signAccessToken = (user) =>
    jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: "15m",
    });

const signRefreshToken = (user) =>
    jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "7d",
    });

// =====================================================
// ► REGISTER USER
// =====================================================
// controllers/authController.js
// =====================================================
// ► REGISTER USER
// =====================================================
const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password)
            return res.status(400).json({ ok: false, message: "All fields are required" });

        const exists = await User.findOne({ email });
        if (exists)
            return res.status(400).json({ ok: false, message: "Email already exists" });

        const hashed = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashed,
            role: role || "student",
            isVerified: true, // skip email verification for now
        });

        // Generate tokens
        const token = signAccessToken(user);
        const refreshToken = signRefreshToken(user);

        await RefreshToken.create({
            user: user._id,
            token: refreshToken,
            expiresAt: new Date(Date.now() + 7 * 86400000),
        });

        return res.status(201).json({
            ok: true,
            message: "Registration successful",
            token,
            refreshToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (err) {
        console.error("REGISTER ERROR:", err);
        return res.status(500).json({ ok: false, message: "Server error" });
    }
};



// =====================================================
// ► LOGIN (WITH TOKEN)
// =====================================================
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password)
            return res.status(400).json({ message: "Enter email & password" });

        const user = await User.findOne({ email });
        if (!user)
            return res.status(400).json({ message: "Invalid credentials" });

        const match = await bcrypt.compare(password, user.password);
        if (!match)
            return res.status(400).json({ message: "Invalid credentials" });

        const token = signAccessToken(user);
        const refreshToken = signRefreshToken(user);

        await RefreshToken.create({
            user: user._id,
            token: refreshToken,
            expiresAt: new Date(Date.now() + 7 * 86400000),
        });

        res.json({
            message: "Login successful",
            token,
            refreshToken,
            user: {
                id: user._id,
                name: user.name,
                role: user.role,
                email: user.email
            }
        });
    } catch (err) {
        console.log("LOGIN ERROR:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// =====================================================
// ► REFRESH TOKEN
// =====================================================
const refreshToken = async (req, res) => {
    try {
        const { token } = req.body;
        if (!token) return res.status(400).json({ message: "Token required" });

        const stored = await RefreshToken.findOne({ token });
        if (!stored) return res.status(401).json({ message: "Invalid token" });

        const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(payload.id);

        const newAccess = signAccessToken(user);

        res.json({ token: newAccess });
    } catch (err) {
        res.status(401).json({ message: "Invalid refresh token" });
    }
};

// =====================================================
// ► LOGOUT
// =====================================================
const logout = async (req, res) => {
    try {
        const { token } = req.body;
        if (token) await RefreshToken.deleteOne({ token });

        res.json({ message: "Logout successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

// =====================================================
// ► REQUEST PASSWORD RESET
// (Email removed – returns reset token manually)
// =====================================================
const requestPasswordReset = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user)
            return res.status(404).json({ message: "Email not found" });

        const token = crypto.randomBytes(32).toString("hex");

        await PasswordReset.create({
            user: user._id,
            token,
            expiresAt: new Date(Date.now() + 3600000),
        });

        // FRONTEND WILL HANDLE RESET
        res.json({
            message: "Reset link generated",
            resetLink: `${process.env.FRONTEND_URL}/reset-password/${token}`,
            token
        });

    } catch (err) {
        console.log("RESET REQUEST ERROR:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// =====================================================
// ► RESET PASSWORD
// =====================================================
const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;

        const record = await PasswordReset.findOne({ token });
        if (!record)
            return res.status(400).json({ message: "Invalid reset token" });

        const hashed = await bcrypt.hash(newPassword, 10);

        await User.findByIdAndUpdate(record.user, { password: hashed });
        await PasswordReset.deleteOne({ token });

        // logout from all devices
        await RefreshToken.deleteMany({ user: record.user });

        res.json({ message: "Password reset successful" });
    } catch (err) {
        console.log("RESET PASSWORD ERROR:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// =====================================================
// ► EXPORT
// =====================================================
module.exports = {
    registerUser,
    loginUser,
    refreshToken,
    logout,
    requestPasswordReset,
    resetPassword,
};
