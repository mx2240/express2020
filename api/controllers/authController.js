// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../models/user");

// // Helper: format user data safely
// const safeUser = (user) => ({
//     id: user._id,
//     name: user.name,
//     email: user.email,
//     role: user.role
// });

// // ========================================
// // REGISTER USER
// // ========================================
// exports.registerUser = async (req, res) => {
//     try {
//         const { name, email, password, role } = req.body;

//         if (!name || !email || !password) {
//             return res.status(400).json({ message: "All fields are required" });
//         }

//         const existing = await User.findOne({ email });
//         if (existing) {
//             return res.status(400).json({ message: "Email already registered" });
//         }

//         // Validate role
//         const validRole = ["admin", "student"].includes(role) ? role : "student";

//         const hashed = await bcrypt.hash(password, 10);

//         const user = await User.create({
//             name,
//             email,
//             password: hashed,
//             role: validRole
//         });

//         // Create token
//         const token = jwt.sign(
//             { id: user._id, role: user.role },
//             process.env.JWT_SECRET,
//             { expiresIn: "7d" }
//         );

//         return res.status(201).json({
//             message: "Registration successful",
//             token,
//             user: safeUser(user)
//         });

//     } catch (error) {
//         return res.status(500).json({
//             message: "Server error",
//             error: error.message
//         });
//     }
// };

// // ========================================
// // LOGIN USER
// // ========================================
// exports.loginUser = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         if (!email || !password) {
//             return res.status(400).json({ message: "Email and password required" });
//         }

//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ message: "Invalid login credentials" });
//         }

//         const match = await bcrypt.compare(password, user.password);
//         if (!match) {
//             return res.status(400).json({ message: "Invalid login credentials" });
//         }

//         const token = jwt.sign(
//             { id: user._id, role: user.role },
//             process.env.JWT_SECRET,
//             { expiresIn: "7d" }
//         );

//         return res.json({
//             message: "Login successful",
//             token,
//             user: safeUser(user)
//         });

//     } catch (error) {
//         return res.status(500).json({
//             message: "Server error",
//             error: error.message
//         });
//     }
// };

// // ========================================
// // GET ALL USERS (ADMIN ONLY)
// // ========================================
// exports.getUsers = async (req, res) => {
//     try {
//         const users = await User.find().select("-password");
//         return res.json(users);
//     } catch (error) {
//         return res.status(500).json({ message: "Server error", error: error.message });
//     }
// };

// // ========================================
// // GET USER BY ID (ADMIN ONLY)
// // ========================================
// exports.getUserById = async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id).select("-password");

//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         return res.json(user);

//     } catch (error) {
//         return res.status(500).json({ message: "Server error", error: error.message });
//     }
// };
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const RefreshToken = require("../models/RefreshToken");
const VerificationToken = require("../models/VerificationToken");
const PasswordReset = require("../models/PasswordReset");
const nodemailer = require("nodemailer");

// helper token creators
const signAccessToken = (user) => jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || "15m" });
const signRefreshToken = (user) => jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || "7d" });

// nodemailer transporter (configure with env)
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// ---------------- Register (with email verification)
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password) return res.status(400).json({ message: "All fields are required" });

        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ message: "Email already registered" });

        const user = await User.create({ name, email, password, role: role || "student", isVerified: false });

        // generate verification token
        const token = crypto.randomBytes(32).toString("hex");
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
        await VerificationToken.create({ user: user._id, token, expiresAt });

        // send verification email (link)
        const verifyUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: user.email,
            subject: "Verify your email",
            text: `Please verify your email by clicking the link: ${verifyUrl}`,
            html: `<p>Please verify your email by clicking the link below:</p><a href="${verifyUrl}">${verifyUrl}</a>`
        };
        transporter.sendMail(mailOptions).catch(err => console.error("Email send error:", err));

        // return tokens (you may prefer to force verification before full access)
        const accessToken = signAccessToken(user);
        const refreshToken = signRefreshToken(user);

        // store refresh token
        const rtExpires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        await RefreshToken.create({ user: user._id, token: refreshToken, expiresAt: rtExpires });

        res.status(201).json({ message: "Registration successful. Check email to verify.", token: accessToken, refreshToken, user: { id: user._id, name: user.name, email: user.email, role: user.role, isVerified: user.isVerified } });

    } catch (err) {
        console.error("registerUser err:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// ---------------- Login (returns access & refresh tokens)
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: "Email and password required" });

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ message: "Invalid credentials" });

        const accessToken = signAccessToken(user);
        const refreshToken = signRefreshToken(user);

        // store refresh token (remove old tokens optionally)
        const rtExpires = new Date(Date.now() + (1000 * 60 * 60 * 24 * 7)); // 7d
        await RefreshToken.create({ user: user._id, token: refreshToken, expiresAt: rtExpires });

        res.json({ message: "Login successful", token: accessToken, refreshToken, user: { id: user._id, name: user.name, email: user.email, role: user.role, isVerified: user.isVerified } });
    } catch (err) {
        console.error("loginUser err:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// ---------------- Refresh token endpoint
exports.refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) return res.status(400).json({ message: "Refresh token required" });

        // check DB
        const stored = await RefreshToken.findOne({ token: refreshToken });
        if (!stored) return res.status(401).json({ message: "Invalid refresh token" });

        // verify signature
        const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        // generate new access token
        const user = await User.findById(payload.id);
        if (!user) return res.status(401).json({ message: "User not found" });

        const newAccess = signAccessToken(user);
        res.json({ token: newAccess });
    } catch (err) {
        console.error("refreshToken err:", err);
        return res.status(401).json({ message: "Invalid refresh token", error: err.message });
    }
};

// ---------------- Logout (revoke refresh token)
exports.logout = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (refreshToken) await RefreshToken.deleteOne({ token: refreshToken });

        return res.json({ message: "Logged out" });
    } catch (err) {
        console.error("logout err:", err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};

// ---------------- Verify Email
exports.verifyEmail = async (req, res) => {
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

        res.json({ message: "Email verified" });
    } catch (err) {
        console.error("verifyEmail err:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// ---------------- Request Password Reset (send email)
exports.requestPasswordReset = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ message: "Email required" });

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const token = crypto.randomBytes(32).toString("hex");
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
        await PasswordReset.create({ user: user._id, token, expiresAt });

        const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: user.email,
            subject: "Password reset",
            text: `Reset your password: ${resetUrl}`,
            html: `<p>Reset your password by clicking the link: <a href="${resetUrl}">${resetUrl}</a></p>`
        };
        transporter.sendMail(mailOptions).catch(err => console.error("Email error", err));

        res.json({ message: "Password reset email sent" });
    } catch (err) {
        console.error("requestPasswordReset err:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// ---------------- Reset Password (using token)
exports.resetPassword = async (req, res) => {
    try {
        const { token } = req.query;
        const { newPassword } = req.body;
        if (!token || !newPassword) return res.status(400).json({ message: "Token and new password required" });

        const record = await PasswordReset.findOne({ token });
        if (!record || record.expiresAt < new Date()) return res.status(400).json({ message: "Invalid or expired token" });

        const hashed = await bcrypt.hash(newPassword, 10);
        await User.findByIdAndUpdate(record.user, { password: hashed });

        await PasswordReset.deleteOne({ _id: record._id });
        // optional: remove refresh tokens for this user to force login
        await RefreshToken.deleteMany({ user: record.user });

        res.json({ message: "Password updated successfully" });
    } catch (err) {
        console.error("resetPassword err:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password)
            return res.status(400).json({ message: "All fields required" });

        const existing = await User.findOne({ email });
        if (existing)
            return res.status(400).json({ message: "User already exists" });

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







// const User = require("../models/User");
// const crypto = require("crypto");
// const nodemailer = require("nodemailer");

// exports.forgotPassword = async (req, res) => {
//     const { email } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) return res.json({ message: "Email not found" });

//     const token = crypto.randomBytes(32).toString("hex");

//     user.resetToken = token;
//     user.resetExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
//     await user.save();

//     res.json({
//         message: "Reset link sent",
//         resetLink: `/reset-password/${token}`,
//     });
// };

// exports.resetPassword = async (req, res) => {
//     const { token } = req.params;
//     const { password } = req.body;

//     const user = await User.findOne({
//         resetToken: token,
//         resetExpire: { $gt: Date.now() },
//     });

//     if (!user) return res.json({ message: "Invalid or expired token" });

//     user.password = password;
//     user.resetToken = undefined;
//     user.resetExpire = undefined;
//     await user.save();

//     res.json({ message: "Password reset successful" });
// };
