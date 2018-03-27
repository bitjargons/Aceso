var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    email: {type: String, unique: true, required: true},
    password: String,
    details : {
      username: String,
      avatar: String,
      firstName: String,
      lastName: String,
      description: String
    },
    tests: [
    	{
    		type: mongoose.Schema.Types.ObjectId,
    		ref: "Test"
    	}
    ],
    fillDetailsToken: String,
    fillDetailsExpires: Date,
    isVerified: {type: Boolean, default: false},
    isAdmin: {type: Boolean, default: false}
});

userSchema.plugin(passportLocalMongoose, {
    usernameField: 'email',
    passwordField: 'password'
})

module.exports = mongoose.model("User", userSchema);