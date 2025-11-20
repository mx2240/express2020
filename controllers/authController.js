const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user"); // ensure correct casing
const RefreshToken = require("../models/RefreshToken");
const VerificationToken = require("../models/VerificationToken");
const PasswordReset = require("../models/PasswordReset");
const nodemailer = require("nodemailer");

// --- Helper functions ---
const signAccessToken = (user) =>
    jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || "15m",
    });

const signRefreshToken = (user) =>
    jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || "7d",
    });

// --- Nodemailer transporter ---
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// ==========================
// REGISTER USER (with email verification)
// ==========================
const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password)
            return res.status(400).json({ message: "All fields are required" });

        const existing = await User.findOne({ email });
        if (existing)
            return res.status(400).json({ message: "Email already registered" });

        const hashed = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashed,
            role: role || "student",
            isVerified: false,
        });

        // Create verification token
        const token = crypto.randomBytes(32).toString("hex");
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h
        await VerificationToken.create({ user: user._id, token, expiresAt });

        // Send verification email
        const verifyUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
        await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: user.email,
            subject: "Verify your email",
            html: `<p>Verify email: <a href="${verifyUrl}">${verifyUrl}</a></p>`,
        });

        res.status(201).json({
            message: "Registration successful. Check email to verify.",
            user: { id: user._id, name: user.name, email: user.email, role: user.role },
        });
    } catch (err) {
        console.error("registerUser error:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// ==========================
// LOGIN USER
// ==========================
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ message: "Email and password required" });

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ message: "Invalid credentials" });

        const accessToken = signAccessToken(user);
        const refreshToken = signRefreshToken(user);

        await RefreshToken.create({
            user: user._id,
            token: refreshToken,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });

        res.json({
            message: "Login successful",
            token: accessToken,
            refreshToken,
            user: { id: user._id, name: user.name, email: user.email, role: user.role },
        });
    } catch (err) {
        console.error("loginUser error:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// ==========================
// REFRESH TOKEN
// ==========================
const refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) return res.status(400).json({ message: "Refresh token required" });

        const stored = await RefreshToken.findOne({ token: refreshToken });
        if (!stored) return res.status(401).json({ message: "Invalid refresh token" });

        const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(payload.id);
        if (!user) return res.status(401).json({ message: "User not found" });

        const newAccess = signAccessToken(user);
        res.json({ token: newAccess });
    } catch (err) {
        console.error("refreshToken error:", err);
        res.status(401).json({ message: "Invalid refresh token", error: err.message });
    }
};

// ==========================
// LOGOUT
// ==========================
const logout = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (refreshToken) await RefreshToken.deleteOne({ token: refreshToken });
        res.json({ message: "Logged out" });
    } catch (err) {
        console.error("logout error:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// ==========================
// VERIFY EMAIL
// ==========================
const verifyEmail = async (req, res) => {
    try {
        const { token } = req.query;
        if (!token) return res.status(400).json({ message: "Token missing" });

        const record = await VerificationToken.findOne({ token });
        if (!record) return res.status(400).json({ message: "Invalid or expired token" });

        if (record.expiresAt < new Date()) {
            await VerificationToken.deleteOne({ _id: record._id });
            return res.status(400).json({ message: "Token expired" });
        }

        await User.findByIdAndUpdate(record.user, { isVerified: true });
        await VerificationToken.deleteOne({ _id: record._id });

        res.json({ message: "Email verified successfully" });
    } catch (err) {
        console.error("verifyEmail error:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// ==========================
// REQUEST PASSWORD RESET
// ==========================
const requestPasswordReset = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ message: "Email required" });

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const token = crypto.randomBytes(32).toString("hex");
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
        await PasswordReset.create({ user: user._id, token, expiresAt });

        const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
        await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: user.email,
            subject: "Password reset",
            html: `<p>Reset your password: <a href="${resetUrl}">${resetUrl}</a></p>`,
        });

        res.json({ message: "Password reset email sent" });
    } catch (err) {
        console.error("requestPasswordReset error:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// ==========================
// RESET PASSWORD
// ==========================
const resetPassword = async (req, res) => {
    try {
        const { token } = req.query;
        const { newPassword } = req.body;
        if (!token || !newPassword)
            return res.status(400).json({ message: "Token and new password required" });

        const record = await PasswordReset.findOne({ token });
        if (!record || record.expiresAt < new Date())
            return res.status(400).json({ message: "Invalid or expired token" });

        const hashed = await bcrypt.hash(newPassword, 10);
        await User.findByIdAndUpdate(record.user, { password: hashed });
        await PasswordReset.deleteOne({ _id: record._id });
        await RefreshToken.deleteMany({ user: record.user }); // force logout

        res.json({ message: "Password updated successfully" });
    } catch (err) {
        console.error("resetPassword error:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// ==========================
// EXPORT ALL
// ==========================
module.exports = {
    registerUser,
    loginUser,
    refreshToken,
    logout,
    verifyEmail,
    requestPasswordReset,
    resetPassword,
};
