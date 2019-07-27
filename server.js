const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require ('body-parser');
const methodOverride = require("method-override");
//const bcrypt =require('bcryptjs');
const usersController =require('./Controllers/usersController');

const mongoURI = 'mongodb://localhost:27017/' + 'TravelToo';
const db = mongoose.connection;


const User = require('./Models/Users');
// const Destination = require('./Models/Destinations');

//middleware
mongoose.connect(mongoURI, { useNewUrlParser: true}, () =>{
    console.log("The connection works")
});

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: true}));

//errorlog
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', mongoURI));
db.on('disconnected', () => console.log('mongo disconnected'));

//Homepage
app.get("/", (req,res)=>{
    res.render('home.ejs');
  });
  
//CREATE-Login
router.post('/', async (req,res)=>{
    console.log(req.body);
    const userFromDb = await User.findOne({username: req.body.username});
    const validatePW = bcrypt.compareSync(req.body.password,userFromDb.password);
    console.log(userFromDb);
    if(validatePW){
        //req.session.userId = userFromDb;
        res.redirect(`/users/${userFromDb._id}`)
    }else{
        console.log("bad login");
        res.send("Your log in did not work please try again.")
    }
})

app.use("/users", usersController);

//Local Host
app.listen(3000, () => {
    console.log('-Travelers Unite-');
});

