const express = require("express");
const router = express.Router();
const { registerParent, loginParent, getParentChildren, getChildDashboard } = require("../controllers/parentController");
const { verifyToken, verifyAdmin, verifyParent } = require("../middleware/authMiddleware");

// Register parent (Admin only)
router.post("/register", verifyToken, verifyAdmin, registerParent);

// Parent login
router.post("/login", loginParent);

// Parent-only: get their children
router.get("/:parentId/children", verifyToken, verifyParent, getParentChildren);

// Parent-only: view child's dashboard
router.get("/child/:studentId", verifyToken, verifyParent, getChildDashboard);

module.exports = router;
