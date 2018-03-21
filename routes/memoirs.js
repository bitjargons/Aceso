var express = require("express");
var router  = express.Router();
var Memoir = require("../models/memoir");
var Comment = require("../models/comment");
var middleware = require("../middleware");
var request = require("request");
var { isLoggedIn, checkUserMemoir, checkUserComment, isVerified , isAdmin } = middleware;

//INDEX - show all memoirs
router.get("/", isLoggedIn, isVerified ,function(req, res){
    // Get all memoirs from DB
    Memoir.find({}, function(err, allmemoirs){
       if(err){
           console.log(err);
       } else {
          res.render("memoirs/index", {memoirs:allmemoirs, page: "memoirs"});
       }
    });
});

//CREATE - add new Memoir to DB
router.post("/", isLoggedIn, isVerified, function(req, res){
    // get data from form and add to memoirs array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newMemoir = {name: name, image: image, description: desc, author:author}
    // Create a new Memoir and save to DB
    Memoir.create(newMemoir, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to memoirs page
            // console.log(newlyCreated);
            res.redirect("/memoirs");
        }
    });
});

//NEW - show form to create new Memoir
router.get("/new", isLoggedIn, isVerified, function(req, res){
   res.render("memoirs/new"); 
});

// SHOW - shows more info about one Memoir
router.get("/:id", isLoggedIn, isVerified,function(req, res){
    //find the Memoir with provided ID
    Memoir.findById(req.params.id).populate("comments").exec(function(err, foundMemoir){
        if(err || !foundMemoir){
            console.log(err);
            req.flash('error', 'Sorry, that memoir does not exist!');
            return res.redirect('/memoirs');
        } else {
            // console.log(foundMemoir)
            //render show template with that Memoir
            res.render("memoirs/show", {memoir: foundMemoir});
        }
    });
});

// EDIT Memoir ROUTE
router.get("/:id/edit", isLoggedIn, isVerified, checkUserMemoir , function(req, res){
  Memoir.findById(req.params.id, function(err, foundMemoir){
    if (err) {
      console.log(err);    
    } else {
      res.render("memoirs/edit", {memoir: foundMemoir});
    }
  });
});

// UPDATE Memoir ROUTE
router.put("/:id", isLoggedIn, isVerified, checkUserMemoir,function(req, res){
    // find and update the correct Memoir
    // console.log(req.body.memoir);
    Memoir.findByIdAndUpdate(req.params.id, req.body.memoir, function(err, updatedMemoir){
       if(err){
          req.flash("error", err.message)
          res.redirect("back");
       } else {
           req.flash("success","Successfully Updated!");
           res.redirect("/memoirs/" + req.params.id);
       }
    });
});

// DESTROY Memoir and its comments from the database
router.delete("/:id", isLoggedIn, isVerified, checkUserMemoir, function(req, res) {
    Comment.remove({
      _id: {
        $in: req.memoir.comments
      }
    }, function(err) {
      if(err) {
          req.flash('error', err.message);
          res.redirect('/');
      } else {
          req.memoir.remove(function(err) {
            if(err) {
                req.flash('error', err.message);
                return res.redirect('/');
            }
            req.flash('error', 'Memoir deleted!');
            res.redirect('/memoirs');
          });
      }
    })
});


module.exports = router;

