const express = require('express');
const router = express.Router();
// const { ObjectId } = require('mongodb');
// const { getDb } = require('../../db'); // Adjust the path as necessary
const addSport = require('../../models/adminModel');
const { upload } = require('../../controllers/userController');






// Upload route
router.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  res.json({
    message: 'Image uploaded successfully!',
    file: req.file,
    path: `/uploads/${req.file.filename}`
  });
});













let users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' }
];


// DELETE /users/:id
router.delete('/users/:id', async (req, res,next) => {


  // const { id } = req.params; // Access the ID from the URL parameter
  // users = users.filter(user => user.id !== parseInt(id)); // Remove the user
  // res.status(200).send(`User with ID ${id} has been deleted.`)
    
  const deleted = await addSport.findByIdAndDelete(req.params.id)
 res.send(deleted);
  res.status(204).send(deleted); 
});



// router.delete('/users/:id', async (req, res) => {
//   try {
//     const db = getDb();
//     const result = await db.collection('users').deleteOne({ title: new ObjectId(req.params.id) });

//     if (result.deletedCount === 0) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.json({ message: 'User deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });




router.get('/admin', function(req, res, next) {

 const video = "Sporst replay";

  res.render('admin/index', { video: video });
});



router.get('/admin/add', async function(req, res, next) {

 const sports = await addSport.find();

  res.render('admin/addSports', { sports: sports });
});



router.post('/admin/add',upload.single('image'), async (req, res) => {
  try {
   

    if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
   const imageUrl = `/uploads/${req.file.filename}`;
  // res.json({
  //   message: 'Image uploaded successfully!',
  //   file: req.file,
  //   path: `/uploads/${req.file.filename}`
  // });

    // Create a new sport entry
    const newSport = new addSport({
      image:imageUrl,
      title:req.body.title,
      content:req.body.content
    });

    // Save the sport to the database
    await newSport.save();

    res.redirect("/admin/add");
  } catch (error) {
    console.error('Error adding sport:', error);
    res.status(500).json({ message: 'Internal server error' });
  }

  
}); 


router.delete('/admin/:id/delete', async (req, res) => {
  try {
    const sportId = req.params.id;  
    // Find the sport by ID and delete it
    const deletedSport = await addSport.findByIdAndDelete(sportId);
    
    if (!deletedSport) {
      // return res.json({ message: 'Sport not found' });
      res.redirect("/admin/add/");
    }
    res.redirect("/admin/add/");


  } catch (error) {
  
    res.redirect("/");
    // res.status(500).json({ message: 'Internal server error' });
  }
});

router.put('/admin/update/:id', async (req, res) => {
  try {
    const sportId = req.params.id;  
    // Find the sport by ID and update it
    const updatedSport = await addSport.findByIdAndUpdate(sportId, req.body, { new: true });
    if (!updatedSport) {
      return res.status(404).json({ message: 'Sport not found' });
    }
    res.status(200).json({ message: 'Sport updated successfully', sport: updatedSport });
  } catch (error) {
    console.error('Error updating sport:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get("/admin/sports/:id", async (req, res) => {
  try {
    const sportId = req.params.id;
    // Find the sport by ID
    const sport = await addSport.findById(sportId);
    if (!sport) {
      return res.status(404).json({ message: 'Sport not found' });
    }
    res.status(200).json(sport);
  } catch (error) {
    console.error('Error fetching sport:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});






module.exports = router;