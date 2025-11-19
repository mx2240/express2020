const express = require('express');
const router = express.Router();



router.get('/signin', (req, res) => {
    // Render the account form view
    res.render('account/login', { title: 'Sign In' });
});

router.get('/signup', (req, res) => {
    // Render the account form view
    res.render('account/register', { title: 'Sign Up' });
});

router.get('/forgot-password', (req, res) => {
    // Render the forgot password view
    res.render('account/forgot-password', { title: 'Forgot Password' });
});

router.get('/reset-password', (req, res) => {
    // Render the reset password view
    res.render('account/reset-password', { title: 'Reset Password' });
});

router.get('/profile', (req, res) => {
    // Render the user profile view
    res.render('account/profile', { title: 'User Profile' });
});


router.get('/settings', (req, res) => {
    // Render the account settings view
    res.render('account/settings', { title: 'Account Settings' });
});

router.get('/logout', (req, res) => {
    // Handle user logout
    // This could involve clearing session data or tokens
    res.redirect('/signin');
});


// Export the router to be used in the main app
module.exports = router;            