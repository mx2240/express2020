const express = require('express');
const router = express.Router();
const AccounntChecker = require('../middleware/usermiddleware');

// const { register, login } = require('');
// router.post('/register', register);
// router.post('/login', login);




router.get('/account', AccounntChecker, (req, res, next) => {
    res.send('respond with login');
});















module.exports = router;