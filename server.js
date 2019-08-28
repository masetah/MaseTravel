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

const mongoURI = 'mongodb://localhost:27017/' + 'TravelToo';

const db = mongoose.connection;
const session = require('express-session');

const destinationsController = require("./Controllers/destinationsController")
const usersController =require('./Controllers/usersController');

const User = require('./Models/Users');


//middleware
mongoose.connect(MONGODB_URI, { useNewUrlParser: true}, () =>{
    console.log("The connection works")
});


//LOCAL

app.use(session({
    secret: "keepitsecret",
    resave: false,
    saveUninitialized: false
}));


//HEROKU
// app.use(session({
//   secret: process.env.secret,
//   resave: false,
//   saveUninitialized: false
// }));


app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: true}));
app.use("/users", usersController);

app.use("/destinations", destinationsController)


//errorlog
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));



//Homepage
app.get("/", (req,res)=>{
    res.render('home.ejs');
  });

//delete session
app.delete("/logout", (req,res)=>{
req.session.destroy()

console.log(req.session)

res.redirect("/")
})

//CREATE-Login
app.post('/', async (req,res)=>{

  console.log(req.body);
  try{  
    const userFromDb = await User.findOne({username: req.body.username});
    console.log(userFromDb)
    const passwordValid =bcrypt.compareSync(req.body.password,userFromDb.password)
    if(passwordValid){
      req.session.userId = userFromDb._id
      console.log(req.session)

      res.redirect(`/users/${userFromDb._id}`)
  }else{
      res.send("bad login")
  }

  //const validatePW = bcrypt.compareSync(req.body.password,userFromDb.password);
  //if(validatePW){

  }catch(err){
      res.send(err)
  }
})


//Host
app.listen(PORT, () => {

//Local Host
app.listen(3000, () => {

    console.log('-Travelers Unite-');
});

