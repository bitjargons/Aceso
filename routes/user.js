var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Memoir = require("../models/memoir");

router.get("/users/:id", function(req, res) {
  User.findById(req.params.id, function(err, foundUser) {
    if(err) {
      req.flash("error", "Something went wrong");
      res.redirect("/");
    } else {
      Memoir.find().where('author.id').equals(foundUser._id).exec(function(err, memoirs){
        res.render("users/show", {user: foundUser, memoirs: memoirs});
      })
    }
  })
});

module.exports = router;