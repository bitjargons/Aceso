var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    email: {type: String, unique: true, required: true},
    password: String,
    details : {
      username: String,
      avatar: String,
      firstName: String,
      lastName: String,
      description: String,
    },
    fillDetailsToken: String,
    fillDetailsExpires: Date,
    isVerified: {type: Boolean, default: false},
    isAdmin: {type: Boolean, default: false}
});

UserSchema.plugin(passportLocalMongoose, {
    usernameField: 'email',
    passwordField: 'password'
})

module.exports = mongoose.model("User", UserSchema);