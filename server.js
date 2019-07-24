const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require ('body-parser');
const methodOverride = require("method-override")
const mongoURI = 'mongodb://localhost:27017/' + 'TravelToo';
const db = mongoose.connection;

//middleware
mongoose.connect(mongoURI, { useNewUrlParser: true}, () =>{
    console.log("The connection works")
});

app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({extended: true}))

//errorlog
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', mongoURI));
db.on('disconnected', () => console.log('mongo disconnected'));

//Homepage
app.get("/", (req,res)=>{
    res.render('home.ejs');
  })
//User Routes
//NEW 
app.get("/new", (req,res)=>{
    res.render("user/new.ejs")
})

//CREATE
// app.post("/", (req, res)=> {
//    newUser.create(req.body, (error, createUser)=>{
//         res.redirect('/users');
//     })
// })
//SHOW
app.get("/:id", (req,res)=>{
    res.render("/user/show.ejs");
  })
//DELETE

//EDIT

//PUT

//Desination Routes
//INDEX

//NEW 

//CREATE

//SHOW

//DELETE

//EDIT

//PUT


//Local Host
app.listen(3000, () => {
    console.log('-Travelers Unite-');
});

