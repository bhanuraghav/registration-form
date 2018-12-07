const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstname : {
        type: String,
        required: true
    },
    lastname : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password : {
        type: String,
        required: true,
        select: false
    },
    country : {
        type: String,
        required: true
    },
    dob : {
        type : Date,
        required: true
    },
    gender : {
        type: String,
        required: true
    },
    phone1 :{
        type: String,
        required: true
    },
    phone2 :{
        type: String,
    }

});

module.exports = mongoose.model('User',UserSchema);

