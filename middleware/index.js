var Memoir = require("../models/memoir");
var Comment = require("../models/comment");
var User = require("../models/user");
var Disorder = require("../models/disorder");
var Post = require("../models/disorder");

module.exports = {
  isLoggedIn: function(req, res, next) {
    console.log(req.user);
    if(req.isAuthenticated()) {
      return next();
    }
    req.flash("error", "You must be signed in to do that!");
    res.redirect("/login");
  },
  checkUserMemoir: function(req, res, next) {
    Memoir.findById(req.params.id, function(err, foundMemoir){
      if(err || !foundMemoir){
          console.log(err);
          req.flash('error', 'Sorry, that memoir does not exist!');
          res.redirect('/memoirs');
      } else if(foundMemoir.author.id.equals(req.user._id) || req.user.isAdmin){
          req.memoir = foundMemoir;
          return next();
      } else {
          req.flash('error', 'You don\'t have permission to do that!');
          res.redirect('/memoirs/' + req.params.id);
      }
    });
  },
  checkUserComment: function(req, res, next) {
    Comment.findById(req.params.comment_id, function(err, foundComment){
       if(err || !foundComment){
           req.flash("error", "Comment not found");
           res.redirect("back");
       } else {
           // does user own the comment?
        if(foundComment.author.id.equals(req.user._id)) {
          return next();
        } else {
          req.flash("error", "You don't have permission to do that!");
          res.redirect("back");
        }
       }
    });
  },
  isVerified: function(req, res, next) {
    if(req.user.isVerified) {
      return next();
    }
    req.flash("error", "You must verify your account!");
    res.redirect("/login");
  },
  isAdmin: function(req, res, next) {
    if(req.user.isAdmin) {
      return next();
    } else {
      req.flash('error', 'This site is now read only thanks to spam and trolls.');
      res.redirect('back');
    }
  }
} 

