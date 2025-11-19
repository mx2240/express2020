const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserModel');   


// router.get('/', (req, res) => {
//     res.send('User API is working');
// });



router.post('/users/create', async (req, res) => {
 try {

   const userData = req.body;
   const user = new UserModel(userData);
    await user.save();
    console.log('Received user data:', userData);
    res.status(201).json({ message: "User created successfully" });
  
 } catch (error) {
  
  console.log(" Error ",error)
 }
});



router.get('/users', (req, res) => {
  res.json([{ id: 1, name: 'MR ABASS' }]);
});

// Route to create a new user

router.post('/users', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // Validate inputs here
    // Save to DB
    const user = new UserModel({ username, email, password });
    await user.save();
    res.status(201).json({ message: "User created successfully" });

  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to get all users
router.get('/users/all', async (req, res) => {
    try {

        // Fetch all users from the database
        const users = await UserModel.find();
        res.status(200).json(users);

    } catch (error) { 

       res.status(500).json({ error: 'Error fetching users' });
    }
})






module.exports = router;