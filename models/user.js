const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//User Schema
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        //unique: true
    },
    firstname : {
        type: String,
        required: true
    },
    lastname : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    country : {
        type: String,
        required: true
    },
    dob : {
        type : Date,
        required: true
    },
    phone1 :{
        type: String,
        required: true
    }
});

const User = module.exports = mongoose.model('User',UserSchema);

module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}

module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}
