
const jwt = require("jsonwebtoken");
// const { secretKey } = require("../config/config");

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers["authorization"].replace("Bearer ", "");
        if (!token) throw new Error("Authentication token is missing");
        const decoded = await jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid authentication token" });
    }
};

const verifyAdmin = async (req, res, next) => {
    try {
        if (req.user.role !== "admin") throw new Error("Only admin can access this route");
        next();
    } catch (err) {
        res.status(403).json({ message: "Only admin can access this route" });
    }
};

module.exports = { verifyToken, verifyAdmin };
