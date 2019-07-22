const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const destinationSchema = new Schema ({
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        max: 5,
        min: 1,
        required: true
    },
    description: {
        type: String,
        required: true
    }, 
    visitSeason: {
        type: String,
        required: true
    }
})

const Destination = mongoose.model('Destination', destinationSchema);

module.exports = Destination;