const express = require('express');
const router = express.Router();
const User = require('../Models/Users');
const bcrypt =require('bcryptjs');

//User Routes
//NEW 
router.get("/new", (req,res)=>{
    currentUser= req.session.userId
    res.render("user/new.ejs")
});

//CREATE User
router.post("/", async(req,res)=>{
  try{
    const salt = bcrypt.genSaltSync();
    console.log(req.body)
    console.log("============")
    console.log(req.body.password)
    console.log("============")
    req.body.password = bcrypt.hashSync(req.body.password, salt); 
    const newUser = await User.create(req.body);
    console.log(newUser)
    req.session.userId = newUser._id;
    currentUser= req.session.userId
    res.redirect(`/users/${newUser._id}`)
  }catch(err){
    console.log(err)
    res.send(err);
  }
})

//SHOW ROUTE
   router.get("/:id", async (req,res)=>{
    try{
    currentUser= req.session.userId
    const foundUser= await User.findById(req.params.id)
    console.log(currentUser)
    res.render('user/show.ejs',{
      oneUser: foundUser
    })
  }catch(err){
    res.send(err);
  }
  });

//DELETE(Stretch to delete a profile)
router.delete("/:id",(req,res)=>{
    User.findByIdAndDelete({_id:req.params.id},(err,deletedUser)=>{
      res.redirect('/users/new');
      })
  })

//EDIT
router.get("/:id/edit", async (req,res)=>{
    currentUser= req.session.userId
    const foundUser = await User.findById(req.params.id)
    //console.log(foundUser)
      res.render('user/edit.ejs',{
        oneUser: foundUser
      })
    });

//PUT
router.put("/:id", async (req, res)=>{
  try{
    const foundUser = await User.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.redirect(`/users/${foundUser._id}`)
  }catch(err){
    res.send(err);
  }
})

module.exports = router;