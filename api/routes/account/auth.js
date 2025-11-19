const express = require('express');
const router = express.Router();
const { register, login } = require('../../controllers/userController');
const authenticateJWT = require('../../middleware/authMiddleware');
router.post('/register', register);
router.post('/login', login);

//Protected route
router.get('/profile', authenticateJWT, (req, res) => {
    

    res.json({ message: 'This is a protected route', user: req.user });
    
});

module.exports = router;