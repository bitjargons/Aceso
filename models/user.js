var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    rollno: {type: String, unique: true, required: true},
    password: String,
    email: {type: String, unique: true, required: true},
    details : {
      username: {type: String, unique: true},
      avatar: String,
      firstName: String,
      lastName: String,
      description: String,
    },
    fillDetailsToken: String,
    fillDetailsExpires: Date,
    isDetailsFilled: {type: Boolean, default: false},
    isAdmin: {type: Boolean, default: false}
});

UserSchema.plugin(passportLocalMongoose, {
    usernameField: 'email',
    passwordField: 'password'
})

module.exports = mongoose.model("User", UserSchema);