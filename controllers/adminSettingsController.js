const AdminSettings = require("../models/AdminSettings");

// GET current settings
exports.getSettings = async (req, res) => {
    try {
        let settings = await AdminSettings.findOne();
        if (!settings) {
            // create default if not exists
            settings = await AdminSettings.create({});
        }
        res.json({ settings });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// UPDATE settings
exports.updateSettings = async (req, res) => {
    try {
        const { notifications, darkMode } = req.body;
        let settings = await AdminSettings.findOne();
        if (!settings) {
            settings = await AdminSettings.create({ notifications, darkMode });
        } else {
            settings.notifications = notifications;
            settings.darkMode = darkMode;
            await settings.save();
        }
        res.json({ message: "Settings updated", settings });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
