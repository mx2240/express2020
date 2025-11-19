const express = require('express');
const router = express.Router();
const authController = require('../../controllers/authController'); // adjust path

// Use the actual function from the controller
router.get('/login', authController.login);
router.post('/login', authController.loginPost);
router.post('/register', authController.register);

module.exports = router;
