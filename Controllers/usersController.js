const express = require('express');
const router = express.Router();
const User = require('../Models/Users');
const bcrypt =require('bcryptjs');

//ROUTES
//NEW 
router.get("/new",(req,res)=>{
    res.render("users/new.ejs")
})
//CREATE
router.post("/", async (req, res)=>{
    try{
        const newUser =await User.create(req.body);
        console.log(newUser);
        req.session.userId = newUser._id;
        res.redirect("/");
    } catch(err){
            res.send("Your registration failed, please try a new username.");
    }
})
//SHOW

//DELETE

//EDIT

//PUT

module.exports = router;












module.exports = router;