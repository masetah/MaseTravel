const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type:String,
        required:true
    },
    quote: {
        type: String,
        maxlength: 140
    }, 
    interests:{
        type: String,
        maxlength: 200
    },
    bucketList: {
        type: Array
    },
    experienceLevel: {
        type: String
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;