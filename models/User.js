const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

// Reference passport-local-mongoose to make this model usable for managing users
const passportLocalMongoose = require('passport-local-mongoose');
// Create the model schema; username and password are included automatically

const userSchema = new mongoose.Schema({});

userSchema.plugin(passportLocalMongoose);

userSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', userSchema);
