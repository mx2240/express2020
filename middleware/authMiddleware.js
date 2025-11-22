const jwt = require("jsonwebtoken");

// ------------------ Verify Token ------------------
function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ ok: false, message: "No token provided" });

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ ok: false, message: "Token missing" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.error(err);
        return res.status(401).json({ ok: false, message: "Invalid token" });
    }
}

// ------------------ Verify Admin ------------------
function verifyAdmin(req, res, next) {
    if (!req.user) return res.status(401).json({ ok: false, message: "User not found" });
    if (req.user.role !== "admin")
        return res.status(403).json({ ok: false, message: "Admin access required" });
    next();
}

module.exports = { verifyToken, verifyAdmin };
