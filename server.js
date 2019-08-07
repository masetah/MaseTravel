const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require ('body-parser');
const methodOverride = require("method-override");
const bcrypt =require('bcryptjs');
const mongoURI = 'mongodb://localhost:27017/' + 'TravelToo';
const db = mongoose.connection;
const session = require('express-session');

const destinationsController = require("./Controllers/destinationsController")
const usersController =require('./Controllers/usersController');

const User = require('./Models/Users');


//middleware
mongoose.connect(mongoURI, { useNewUrlParser: true}, () =>{
    console.log("The connection works")
});

app.use(session({
    secret: "keepitsecret",
    resave: false,
    saveUninitialized: false
}));

app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: true}));
app.use("/users", usersController);
app.use("/destinations", destinationsController);
app.use((req, res, next)=>{
  res.locals.currentUser = req.session.userId
  next();
})
//errorlog
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', mongoURI));
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
  }catch(err){
      res.send(err)
  }
})

//Local Host
app.listen(3000, () => {
    console.log('-Travelers Unite-');
});
