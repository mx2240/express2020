// // const express = require("express");
// // const router = express.Router();
// // const { registerUser, loginUser } = require("../controllers/authController");

// // router.post("/register", registerUser);
// // router.post("/login", loginUser);

// // module.exports = router;

// // const express = require("express");
// // const router = express.Router();
// // const authCtrl = require("../controllers/authController");
// // const { verifyToken } = require("../middleware/authMiddleware");
// // const { forgotPassword, resetPassword } = require("../controllers/authController");

// // // registration & login
// // router.post("/register", authCtrl.registerUser);
// // router.post("/login", authCtrl.loginUser);

// // // refresh, logout
// // router.post("/refresh", authCtrl.refreshToken);
// // router.post("/logout", authCtrl.logout);

// // // email verify
// // router.get("/verify-email", authCtrl.verifyEmail);

// // // password reset
// // router.post("/request-reset", authCtrl.requestPasswordReset);
// // router.post("/reset-password", authCtrl.resetPassword);


// // router.post("/forgot-password", forgotPassword);
// // router.post("/reset-password/:token", resetPassword);

// // module.exports = router;




// const express = require("express");
// const router = express.Router();
// const authCtrl = require("../controllers/authController");
// const { verifyToken } = require("../middleware/authMiddleware");

// // ------------------------
// // User Registration & Login
// // ------------------------
// router.post("/register", authCtrl.registerUser);
// router.post("/login", authCtrl.loginUser);

// // ------------------------
// // Token Management
// // ------------------------
// router.post("/refresh", authCtrl.refreshToken);
// router.post("/logout", authCtrl.logout);

// // ------------------------
// // Email Verification
// // ------------------------
// // router.get("/verify-email", authCtrl.verifyEmail);

// // ------------------------
// // Password Reset
// // ------------------------
// router.post("/request-reset", authCtrl.requestPasswordReset); // request email link
// router.post("/reset-password", authCtrl.resetPassword); // reset using token

// module.exports = router;




// routes/authRoutes.js
const express = require("express");
const router = express.Router();

const {
    registerUser,
    loginUser,
    refreshToken,
    logout,
    requestPasswordReset,
    resetPassword,
} = require("../controllers/authController");

// ==============================
// AUTH ROUTES
// ==============================

// REGISTER USER
router.post("/register", registerUser);

// LOGIN USER
router.post("/login", loginUser);

// REFRESH ACCESS TOKEN
router.post("/refresh-token", refreshToken);

// LOGOUT USER
router.post("/logout", logout);

// REQUEST PASSWORD RESET EMAIL
router.post("/forgot-password", requestPasswordReset);

// RESET PASSWORD
router.post("/reset-password/:token", resetPassword);

module.exports = router;
