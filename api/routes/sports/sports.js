const express = require('express');
const router = express.Router();
const Sporst = require('../../models/adminModel');


// /* GET Index Home page. */
// router.get('/admin', function(req, res, next) {

//   video = "Sporst replay";

//   res.render('admin/addSports',{video:video});
// });



/* GET Index Home page. */
router.get('/', async function(req, res, next) {

 const  Sporsts = await Sporst.find();

//  res.send(Sporsts);

  res.render('sports/index',{SporstsKey:Sporsts});
});

/* GET news page. */
router.get('/news', function(req, res, next) {

 const video = "Sporst replay";

  res.render('sports/news',{video : video});
});

/* GET scores page. */
router.get('/scores', function(req, res, next) {

  const video = "Sporst replay";

  res.render('sports/scores',{video:video});
});
/* GET teams page. */
router.get('/teams', function(req, res, next) {

  const video = "Sporst replay";

  res.render('sports/teams',{video:video});
});
/* GET contact page. */
router.get('/contact', function(req, res, next) {

  const video = "Sporst replay";

  res.render('sports/contact',{video:video});
});
























/* GET page5 page. */
router.get('/mary', async function(req, res, next) {
 const  mary =  await Users.find();

  res.send(mary);
});



module.exports = router;