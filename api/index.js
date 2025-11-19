
var createError = require('http-errors');
var express = require('express');
var app = express();
const cors = require('cors');
const serverless = require('serverless-http');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var methodOverride = require('method-override')
require('dotenv').config();
const UserRoutes = require('./routes/UserRoutes');
var indexRouter = require('./routes/Router');
var indexAuth = require('./routes/account/auth');
var sportsRoute = require('./routes/sports/sports');
var formsRoute = require('./routes/account/form');
var adminRoute = require('./routes/sports/admin');
var methodOverride = require('method-override')
const mongose = require('mongoose');
const fs = require('fs');






// // override with POST having ?_method=DELETE
app.use(methodOverride('_method'))




// // view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');




app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Serve uploaded files statically
// app.use('/uploads', express.static('uploads'));
// // Ensure 'uploads' folder exists
// const uploadDir = path.join(__dirname, '../uploads');
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
// }



// // Replace "Ecommerce" with your actual database name
mongose.connect(process.env.MONGO_URI || process.env.MONGO_URI_OFFLINE).then(() => {

  console.log('✅ Connected to MongoDB');

}).catch((err) => {

  console.error('❌ MongoDB connection error:', err);

}); 




// Or allow only specific origins like this:
app.use(cors({

  origin:'https://vite-react2-ashen.vercel.app'||'http://localhost:5173',/// change to your frontend URL
  methods:['GET', 'POST', 'PUT', 'DELETE'],
  credentials:true
  
}));

app.use(express.json()); // <--- VERY IMPORTANT for POST requests with JSON bodies



// Your routes

app.use('/', sportsRoute);
app.use('/', indexAuth);
app.use('/', adminRoute);
app.use('/', indexRouter);
app.use('/', formsRoute);
app.use("/", UserRoutes);


// // catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// // error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
  res.status(err.status || 500);
  res.render('error');
});



app.listen(process.env.PORT, () => console.log(`127.0.0.1:${process.env.PORT}`));

module.exports = app;
// module.exports.handler = serverless(app);