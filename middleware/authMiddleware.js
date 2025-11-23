// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        console.log("No token provided or bad header:", authHeader);
        return res.status(401).json({ ok: false, message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // { id, role, iat, exp }
        return next();
    } catch (err) {
        console.error("Token verify failed:", err);
        return res.status(401).json({ ok: false, message: "Invalid token" });
    }
}

function verifyAdmin(req, res, next) {
    if (!req.user) return res.status(401).json({ ok: false, message: "User not found" });
    if (req.user.role !== "admin") return res.status(403).json({ ok: false, message: "Admin access required" });
    next();
}

module.exports = { verifyToken, verifyAdmin };
