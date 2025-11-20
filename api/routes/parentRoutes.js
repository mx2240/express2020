const express = require("express");
const router = express.Router();

const parentCtrl = require("../controllers/parentController");

router.post("/register", parentCtrl.registerParent);
router.post("/login", parentCtrl.loginParent);
router.get("/:parentId/children", parentCtrl.getParentChildren);
router.get("/child/:studentId", parentCtrl.getChildDashboard);

module.exports = router;
