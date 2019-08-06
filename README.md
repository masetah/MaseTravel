## Problem we solve

Since the new millennium the intense desire to travel has grown exponentially. Many people in developed countries around the globe know of someone who travels regularly, yet many people in those same countries haven’t yet taken their first trip. Why? The barriers to travel can include fear, absence of time, and cost. Our TravelToo app aims to encourage a first time traveler to create their travel dreams despite the fear they feel they do have or the time and money they realize they don’t. With seasoned travelers sharing their travel experiences--from how to get there to how much it costs--the novice traveler can look forward to enjoying their fair share of travel, too. 

## User Stories


- Site is an open platform for users to share past experiences in their travels. Other users are able to reference travel ratings and opinions when planning future travels.

- New user visits the site and is able to click on the destinations, see ratings, and read descriptions without logging in.

- User returning from a trip will register and fill out a profile form. Once they’ve completed the form they will then create a new destination and add information about their trip to the site. 

## Approaches Taken
 
- Utilized restful routing to enable controllers to enable create, read, update and destroy (CRUD) operations while using a mongoose model to perform CRUD operations
- Began the routing process in the server.js file and eventually divided our application into Models, Views, and Controller files to address separation of concerns and make debugging more efficient
- Used template files to render data and used forms to accept user input
- Utilized mongo shell to create and use two Mongoose schemas
- Used middleware functions to get in the middle of our requests (and…)
- Added bootstrap navigation bar as a partial, also added head and footer partials 
- Refactored mongoose queries with async/await syntax to make promises easier to work with
- Added sessions to express to track user activity
- Used bcrypt to hash passwords and enable authentication of login route

 ## Technologies used
- Express web server, a web application framework that provides fundamental web application features. 
- EJS Templating Language used to generate HTML markup with plain javascript
- Mongo Database, a document database that supports data structures like arrays, nested objects, and schemas
- Mongoose Database, an Object Data Modeling (ODM) library for MongoDB and Node js

## Installation requirements:
 Installed the following NPM packages: 
1. Express via ‘npm i express’ 
1. EJS via ‘npm i ejs’
1. Method-override via ‘npm i method-override’
1. Mongoose via ‘npm i mongoose’
1. Sessions via ‘npm i sessions’
1. Bcryptjs via ‘npm i bcrypt’

## Forthcoming features

- Image placement inside destination cards on destination show page
- Enhanced footer that includes links to social media outlets and information about TravelToo creators

## Wireframe Links
You can find our wireframes [here](https://wireframepro.mockflow.com/editor.jsp?editor=off&perm=Owner&projectid=M4ac6c155ebb3c2130265f144a1c082031563806072246&publicid=9a437f0fa54e4f7182ebb6254b917702#/page/0c40fa6ab6074f05a2b02f51ef55cd97)

## Contributor information

Contributors to TravelToo App (in alphabetical order): 

Roderick Armstrong

Yashira Baggett

Mase Taherian


