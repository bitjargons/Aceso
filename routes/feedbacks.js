var express = require("express");
var router = express.Router();
var Feedback=require("../models/feedback");
var middleware=require("../middleware");
var request = require("request");
var {isLoggedIn, isVerified , isAdmin } = middleware;	



//INDEX - show all feedbacks
router.get("/index", isLoggedIn, isVerified, function(req,res){
// get all Feedback From DB
	Feedback.find({}, function(err, allfeedbacks){
       	if(err){
          console.log(err);
       	} else {
            res.render("feedbacks/index", {feedbacks:allfeedbacks});
       	}
    });
});

//Form To Add data
router.get("/", isLoggedIn, isVerified, function(req, res){
   res.render("feedbacks/new"); 
});

//CREATE - add new Feedback to DB
router.post("/",isLoggedIn, isVerified, function(req,res){
	  var author= {
        id: req.user._id,
        username: req.user.details.username
    }
    var feedback = req.body.feedback;
    var rating = req.body.rating;
    var newFeedback = {author:author, feedback: feedback,rating: rating}
    Feedback.create(newFeedback, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
  					res.redirect("/home");      }
    });
	
});

module.exports = router;