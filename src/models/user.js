const mongoose = require('mongoose');
const bcrypt = require('bcrypt');



const userSchema = new mongoose.Schema({
   
    firstName: {
        type: String,
        required: true,
        trim: true,
        min: 2,
        max: 25
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        min: 2,
        max: 25
    }, 
    username: {
        type: String,
        required: true,
        trim:true,
        unique: true,
        index: true,
        lowercase: true
    }, 
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,
    }, 
    password: {
        type: String,
        required: true,
        
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    contactNumber: {type: String},
    profilePicture: {type: String}
    
}, {timestamps: true});




module.exports = mongoose.model('User', userSchema);

