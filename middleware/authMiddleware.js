const jwt = require("jsonwebtoken");

// ------------------ Verify Token ------------------
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    console.log("Authorization header →", authHeader || "NONE");

    // Check Bearer token
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ ok: false, message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log("Decoded token →", decoded);

        req.user = decoded; // attach decoded user data
        next();
    } catch (err) {
        console.log("JWT verification error →", err.message);
        return res.status(401).json({ ok: false, message: "Invalid or expired token" });
    }
};

// ------------------ Verify Admin ------------------
const verifyAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ ok: false, message: "User not found" });
    }

    console.log("User role →", req.user.role);

    if (req.user.role !== "admin") {
        return res.status(403).json({ ok: false, message: "Admin access required" });
    }

    next();
};

module.exports = { verifyToken, verifyAdmin };
