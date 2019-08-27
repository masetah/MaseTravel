const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require ('body-parser');
const methodOverride = require("method-override");
const bcrypt =require('bcryptjs');

//if workiong on local comment below back in
// const mongoURI = 'mongodb://localhost:27017/' + 'TravelToo';

//for hosting on heroku
const PORT = process.env.PORT || 3000; 
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/' + 'TravelToo';

const db = mongoose.connection;
const session = require('express-session');

const destinationsController = require("../Controllers/destinationsController")
const usersController =require('../Controllers/usersController');

const User = require('../Models/Users');


//middleware
mongoose.connect(MONGODB_URI, { useNewUrlParser: true}, () =>{
    console.log("The connection works")
});

//LOCAL
// app.use(session({
//     secret: "keepitsecret",
//     resave: false,
//     saveUninitialized: false
// }));

//HEROKU
app.use(session({
  secret: process.env.secret,
  resave: false,
  saveUninitialized: false
}));