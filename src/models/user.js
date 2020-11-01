const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
        default: 'user'
    },
    contactNumber: {type: String},
    profilePicture: {type: String}
    
}, {timestamps: true});

userSchema.virtual('password')
.set((password) => {
    this.hash_password = bcrypt.hashSync(password,10)

});

userSchema.methods = {
    authenticate: (password) => {
        return bcrypt.compareSync(password, this.hash_password)
    }
}


module.exports = mongoose.model('User', userSchema);

