const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: [true, 'email is required'],
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    firstName: {
        type: String,
        trim: true,
        default: ""
    },
    lastName: {
        type: String,
        trim: true,
        default: ""
    },
}, {
    timestamps: true,
});




const User = mongoose.model('User', userSchema);
module.exports = User;