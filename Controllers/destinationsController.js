const express = require('express');
const router = express.Router();
// const User = require('../Models/Destinations');
// const bcrypt =require('bcryptjs');
//Moved from server.js, require destination model in controller file
const Destination = require('../Models/Destinations.js');

// const mongoose
// const mongoURI
// const db
// const Schema = mongoose.Schema
// mongoose.connect




//DESTINATION ROUTES (Yashira)
//EJS---when ejs (the file extension for our templates) is installed, it will automatically look inside of the 
//specified ejs file when rendered, so you'll use res.render for routes

//Look for logic put into the ejs files (Roderick) either by "squid" tags (injection of variables) or "flounder" tags (used for forEach loops or if checks) and watch for the variable names used in the body of the index.ejs
//SQUIDS---this data holds all the data in our const destinations model. The data will travel from the model file into the server, and the server will
//inject it into the template

//A word about:
//***usng destination.find---since we are in the database, we use the destinations model to find all the destinations, hence destinations.find */
//***using indexes vs id's---since everything from a database has an id, we replace all indexes with id's since indexes are no longer how we will find a specific destination*/
//****using async/await---you're asking for something like a db query to be performed via Destination.find, then you want something to happen when it finishes */

//Creating a test destination ----> mongo---->show dbs----->node server.js-----> check for what's attached to the localhost:27017 ******const mongoURI = 'mongodb://localhost:27017/' + 'TravelToo' ******and use that(use TravelToo)------>show collections-----> db.createCollection('destinations'). If you choose to do the 
//create route first, you don't have to test, mongoose will automatically create these things once operations start happening
//---->db.destinations.insert({----- ----- ---- ---})----> you should see WriteResult({"nInserted": 1})---->db.destinations.find (should show what was just input)---->control c out----->start nodemon--->server should be up and running---->
//localhost:3000/destinations and see a new destination******We just added a database to the app********

//**************** INDEX *****************
//gives access to all destinations
//index route will reference squid injected variable from index.ejs and we'll add a second parameter to our render function that contains an object(key being the squid injected variable in index.ejs (Roderick) and the value being User)
// ( dogs : foundDogs )

//did callback method first (comment out), then async/await
// router.get("/", (req, res)=>{
//     Destination.find({}, (err, destination)=>{
//         res.render("Destinations/index.ejs", {
//             destinationsOnThePage: Destinations
//         })
    
//     })
    
// })

//async--got rid of callback function, no need to go several layers deep anymore;
//got rid of error function

// router.get("/", async (req, res)=>{
//     const Destinations = await Destination.find()
//     res.render("Destinations/index.ejs", {
//          destinationsOnThePage: Destinations
//         });
    
//     })
  
    
 //add back the error part and wrap in a try/catch block:
 //your await function in the try block might go wrong, and in the event, 
 //it will go straight to the catch block that has the parameter of the error
 //this is our strategy for dealing with an error

 router.get("/", async (req, res)=>{
     try{
        const Destinations = await Destination.find()
        res.render("destination/index.ejs", {
             destinationsOnThePage: Destinations
            });

     }catch(err){
         res.send(err);
     }

    })

// ************* NEW *****************
//sends a fresh template to the user

router.get("/new", (req, res)=>{
    res.render("destination/new.ejs")

    
})

//********** CREATE *****************
//user sends back created information

// router.post("/", (req, res)=>{
//     Destination.create((req.body),(err, destination)=>{
//         res.render("show.ejs", {
//         })
//     })
// })

//async

// router.post("/", async (req, res)=>{
//     const Destinations = await Destination.create(req.body)
//         res.render("Destinations/show.ejs", {
//         })
    
//     })
    
//add back the error part


router.post("/", async (req, res)=>{
    try{
        const newDestination = await Destination.create(req.body)
        console.log(newDestination)
        res.redirect("/destinations")
    }catch(err){
        res.send(err);
    }
      
 })



//************************* SHOW *****************************
//access to one specific destination, the id references which destination it is;
//use of req.params.id asks which destination the user wants

// router.get("/:id", (req, res)=>{
//     Destination.findById(req.params.id, (err, destination)=>{
//         res.render("Destinations/show.ejs", {
//             destinationsOnThePage: Destinations
//         })
    
//     })
    
// })

//async

// router.get("/:id", async (req, res)=>{
//     const Destinations = await Destination.findById(req.params.id)
//         res.render("show.ejs", {
//             destinationsOnThePage: Destinations
//         })
    
//     })
    
// add back the error part

router.get("/:id", async (req, res)=>{
    try{
        console.log(req.params.id)
        const Destinations = await Destination.findById(req.params.id)
        console.log(Destinations)
        res.render("./destination/show.ejs", {
            destinationsOnThePage: Destinations
        })
    }catch(err){
        res.send(err);
    }
})

  

//********************* DELETE ***********************
//deletes the destination (usually a modal that pops up to ask if we really want to delete the item)

// router.delete("/:id", (req, res)=>{
//         Destination.findOneAndDelete(req.params.id, (err, destination)=>{
//             res.redirect("/Destinations", {
//             })
        
//         })
        
//     })
    
//async/await

    // router.delete("/:id", async (req, res)=>{
    //     const Destination = await Destination.findOneAndDelete(req.params.id)
    //         res.redirect("/Destinations", {
    //         })
        
    //     })
        


//try/catch

router.delete('/:id',(req,res) => {
    Destination.findByIdAndRemove(req.params.id,(err,data) => {
        res.redirect('/destinations')
    })
  })

// router.delete("/:id", async (req, res)=>{
  
//     try{
//         console.log(req.params)
//         const Destination = await Destination.findByIdAndDelete(req.params.id)
//         console.log(Destination)
//         res.send("deletion successful")
//     }catch(err){
//         res.send(err);
//     }
//   })

//************************* EDIT *************************
//the form to do the updating

// router.get("/:id/edit", (req, res)=>{
//     Destinations.findById(req.params.id, (err, destination)=>{
//         res.render("Destinations/edit.ejs", {
//             destinationsOnThePage : Destinations
//         })
//     })
    
// })

//async/await

// router.get("/:id/edit", async (req, res)=>{
//     const Destinations = await Destinations.findById(req.params.id)
//         res.render("Destinations/edit.ejs", {
//             destinationsOnThePage : Destinations
//         })
//     })
    

//try/catch

router.get("/:id/edit", async (req, res)=>{
    try{
        const Destinations = await Destination.findById(req.params.id)
        res.render("./destination/edit.ejs", {
            destinationsOnThePage : Destinations
        })

}catch(err){
    res.send(err);
}

})


//******************** UPDATE *********************
//actually DOES the updating

// router.put("/:id", (req, res)=>{
//    Destinations.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, destination )=> {
//                 res.redirect(`/Destinations/${req.params.id}`)
   
//     })

// })


//async 

// router.put("/:id", async (req, res)=>{
//     const Destinations = await Destinations.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, destination )=>
//     res.redirect(`/Destinations/${req.params.id}`)

//     )

// })

//try/catch

// router.put('/:id',(req,res) => {
//     Destination.findByIdAndUpdate(req.params.id,(err,data) => {
//         res.redirect(`/destinations/${}`)
//     })
//   })

router.put("/:id", async (req, res)=>{
    try{
    const foundDestination = await Destination.findByIdAndUpdate(req.params.id,req.body,{new:true});
      res.redirect(`/destinations/${foundDestination._id}`)
    }catch(err){
      res.send(err);
    }
   })

// router.put("/:id", async (req, res)=>{
//         try{
//             const Destinations = await Destinations.findById(req.params.id)
//             res.render("destination/edit.ejs", {
//                 destinationsOnThePage : Destinations
//             })
    
//     }catch(err){
//         res.send(err);
//     }
    
//     })



module.exports = router