const mongoose = require('mongoose');

const mongoURI = 'mongodb://localhost:27017/' + 'TravelToo';
const db = mongoose.connection;

mongoose.connect(mongoURI, { useNewUrlParser: true}, () =>{
    console.log("The connection works")
});

db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', mongoURI));
db.on('disconnected', () => console.log('mongo disconnected'));
