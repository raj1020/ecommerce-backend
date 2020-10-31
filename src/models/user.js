import mongoose from 'mongoose';

const {Schema} = mongoose;

const userSchema = new Schema({
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
    hash_password: {
        type: String,
        required: true,
        min: 8,
        max: 16
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'admin'
    },
    contactNumber: {type: String},
    profilePicture: {type: String}
    
}, {timestamps: true});


module.exports = mongoose.model('User', userSchema);

