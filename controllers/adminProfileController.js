const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");

// GET admin profile
exports.getProfile = async (req, res) => {
    try {
        const admin = await Admin.findById(req.user.id).select("-password");
        res.json(admin);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// UPDATE admin profile
exports.updateProfile = async (req, res) => {
    try {
        const { name, email } = req.body;

        const updated = await Admin.findByIdAndUpdate(
            req.user.id,
            { name, email },
            { new: true }
        ).select("-password");

        res.json({ message: "Profile updated successfully", admin: updated });

    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// UPDATE password
exports.updatePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;

        const admin = await Admin.findById(req.user.id);

        // Check old password
        const isMatch = await bcrypt.compare(oldPassword, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Old password is incorrect" });
        }

        admin.password = newPassword;
        await admin.save();

        res.json({ message: "Password updated successfully" });

    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};
