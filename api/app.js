

const express = require('express');
const app = express();
const port = 8080;
const AccountRouter = require('./routes/Account');
const PageRouter = require('./routes/Pages');
const UserRouter = require('./routes/users');
const { default: mongoose } = require('mongoose');
const connectDB = require("./config/db");

connectDB();


app.use('/', AccountRouter);
app.use('/', PageRouter);
app.use('/', UserRouter);


// mongoose.connect(process.env.Mongo_URL).then(() => {
//     console.log('Connected to MongoDB');
// }).catch((err) => {
//     console.log("Error connecting to MongoDB", err);
// })

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});


module.exports = app;