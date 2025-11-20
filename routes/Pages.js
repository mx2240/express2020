const express = require('express');
const router = express.Router();




router.get('/home', (req, res, next) => {
    res.send('this home');
});


router.get('/contact', (req, res, next) => {
    res.send('respond with contact');
});

router.get('/account', (req, res, next) => {
    res.send('respond with account');
});



router.get('/about', (req, res, next) => {
    res.send('respond with login');
});




module.exports = router;