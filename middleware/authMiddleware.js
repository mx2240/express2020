const jwt = require("jsonwebtoken");

// ------------------ Verify Token ------------------
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("Authorization header:", authHeader); // debug

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        console.log("No token provided");
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded token:", decoded); // debug
        req.user = decoded; // attach to request
        next();
    } catch (err) {
        console.error("Token verification failed:", err);
        return res.status(401).json({ message: "Invalid token" });
    }
};

// ------------------ Verify Admin ------------------
const verifyAdmin = (req, res, next) => {
    if (!req.user) {
        console.log("req.user is undefined");
        return res.status(401).json({ message: "User not found" });
    }

    console.log("User role:", req.user.role); // debug
    if (req.user.role !== "admin") {
        console.log("User is not admin");
        return res.status(403).json({ message: "Admin access required" });
    }

    next();
};

module.exports = { verifyToken, verifyAdmin };
