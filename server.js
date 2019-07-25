const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require ('body-parser');
const methodOverride = require("method-override");
const mongoURI = 'mongodb://localhost:27017/' + 'TravelToo';
const db = mongoose.connection;

const User = require('./Models/Users');
const Destination = require('./Models/Destinations');

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

//User Routes
//NEW 
app.get("/users/new", (req,res)=>{
    res.render("user/new.ejs")
});

//CREATE
app.post("/users", async(req,res)=>{
  try{
    const newUser = await User.create(req.body);
    console.log(newUser)
    res.redirect("/")
  }catch(err){
    res.send(err);
  }
})

//SHOW ROUTE
   app.get("/users/:id", async (req,res)=>{
    const foundUser= await User.findById(req.params.id)
    res.render('user/show.ejs',{
      oneUser: foundUser
    })
  });

//DELETE(Stretch to delete a profile)
app.delete("/users/:id",(req,res)=>{
    User.findByIdAndDelete({_id:req.params.id},(err,deletedUser)=>{
      res.redirect('/users/new');
      })
  })

//EDIT
app.get("/users/:id/edit", async (req,res)=>{
    const foundUser = await User.findById(req.params.id)
      res.render('user/edit.ejs',{
        oneUser: foundUser
      })
    });

//PUT
app.put("/users/:id", async (req, res)=>{
  try{
  const foundUser = await User.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.redirect(`/users/${req.params.id}`)
  }catch(err){
    res.send(err);
  }
})

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

