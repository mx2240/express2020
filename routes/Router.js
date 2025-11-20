var express = require('express');
var router = express.Router();
// const Users = require("../models/userModel")



// router.post("/user",async (req,res,next) => {

//   const user = new Users(req.body);
//   const  saved = await user.save();

//   if (saved) {

//     res.redirect("/");

//   }

  
// })



// router.get("/",async (req,res,next) => {

// const users = await Users.find();

//   res.render("home",{users : users })
  
// })


// /* GET index page. */
// router.get('/', async function(req, res, next) {

//   const users =  await Users.find();
//   res.send(users);
//   // res.json([{}])
//   video = "Sporst replay......................";

//   res.render('index',{video:video});
// });


// router.get("/user/:id",async (req,res) => {

//   const user = await Users.findById(req.params.id);
//   if (user){

//     return res.render("index",{user:user})
//   }

  
// })


// router.post("/user", async (req,res)=>{

//   const Users = new Users(req.body);
//   const saved = await Users.save();
//   if(saved){

//     res.redirect("/")

//   }
  

// })


// router.put("/user/:id",async (req,res) => {


//   const update = await Users.findByIdAndUpdate(req.params.id,req.body,{new:true})
  
// })


// router.delete("/user/:id",async (req,res) => {


//   const destroy = await Users.findByIdAndDelete(req.params.id)


  
// })




// /* GET Index Home page. */
// router.get('/', function(req, res, next) {

//   video = "Sporst replay";

//   res.render('sports/index',{video:video});
// });

// /* GET news page. */
// router.get('/news', function(req, res, next) {

//   video = "Sporst replay";

//   res.render('sports/news',{video:video});
// });

// /* GET scores page. */
// router.get('/scores', function(req, res, next) {

//   video = "Sporst replay";

//   res.render('sports/scores',{video:video});
// });
// /* GET teams page. */
// router.get('/teams', function(req, res, next) {

//   video = "Sporst replay";

//   res.render('sports/teams',{video:video});
// });
// /* GET contact page. */
// router.get('/contact', function(req, res, next) {

//   video = "Sporst replay";

//   res.render('sports/contact',{video:video});
// });
























// /* GET page5 page. */
// router.get('/mary', async function(req, res, next) {
//  const  mary =  await Users.find();

//   res.send(mary);
// });


























// /* GET home page. */
// router.get('/', async function(req, res, next) {

// // const user = [
// //   {}
// // ]
//  const users = await User.find() ;
 

//  res.render('index', { links: users });
// });

// /* GET About page. */
// router.get('/about', function(req, res, next) {
//   res.render('about', { title: 'Express' });
// });

// /* GET About page. */
// router.get('/contact', function(req, res, next) {
//   res.render('about', { title: 'Express' });
// });






// // Managing Database

// //////////////////////////
// // Create user
// router.post('/users', async (req, res) => {

//   try {
//     const user = new User(req.body);
//     await user.save();
//     // res.status(201).send(user);
//     res.redirect("/")

//   } catch (err) {

//     res.status(400).send(err);
//   }
// });


// // Get all users
// router.get('/users', async (req, res) => {
// try {

//     const User = await User.find();
//       res.json(User);
//     res.send(users);
  
// } catch (error) {
  
//   res.send(error)
// }
// });


// // Get Single user
// router.get('/users/:id', async (req, res) => {

//   try {
//     const users = await User.findById(req.params.id);

//   res.send(users);
    
//   } catch (error) {
   
//      res.send(error);
//   }
// });


//////////////////////////



// // Managing Database



// //////////////////////////

// // CREATE
// router.post('/', async (req, res) => {
//   try {
//     const User = new User(req.body);
//     const saved = await User.save();
//     res.status(201).json(saved);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // READ ALL
// router.get('/', async (req, res) => {
//   try {
//     const User = await User.find();
//     res.json(User);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // READ ONE
// router.get('/:id', async (req, res) => {
//   try {
//     const User = await User.findById(req.params.id);
//     if (!User) return res.status(404).json({ message: 'Not found' });
//     res.json(User);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // UPDATE
// router.put('/:id', async (req, res) => {
//   try {
//     const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(updated);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // DELETE
// router.delete('/:id', async (req, res) => {
//   try {
//     const deleted = await User.findByIdAndDelete(req.params.id);
//     if (!deleted) return res.status(404).json({ message: 'Not found' });
//     res.json(deleted);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// //////////////////////////



module.exports = router;
