var express = require("express");
var router  = express.Router();
var Disorder = require("../models/disorder");
var Post = require("../models/post");
var middleware = require("../middleware");
var request = require("request");
var {isLoggedIn, checkUserMemoir, checkUserComment, isVerified, isAdmin } = middleware;

//INDEX
router.get("/", isLoggedIn, isVerified ,function(req, res) {
		// Get all disorders from DB
    Disorder.find({}, function(err, alldisorders){
       	if(err){
          console.log(err);
       	} else {
          res.render("disorders/index", {disorders:alldisorders, page: "disorders"});
       	}
    });
});

//NEW - show form to create new Disorder
router.get("/new", isLoggedIn, isVerified, isAdmin, function(req, res){
   res.render("disorders/new"); 
});

//CREATE - add new disorder to data base
router.post("/", isLoggedIn, isVerified, isAdmin ,function(req,res) {
		//get data from form and add to disorders array
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newDisorder = {name: name, image: image, description: description,}
    Disorder.create(newDisorder, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("/disorders");
        }
    });
});

//SHOW 
router.get("/:id", isLoggedIn, isVerified ,function(req, res){
    //find the Disorder with provided ID
  Disorder.find({}, function(err, alldisorders){
    if(err){
      console.log(err);
    } else {
      Disorder.findById(req.params.id).populate("posts").exec(function(err, foundDisorder){
        if(err || !foundDisorder){
            console.log(err);
            req.flash('error', 'Sorry, that disorder does not exist!');
            return res.redirect('/disorders');
        } else {
            // console.log(foundDisorder)
            //render show template with that Disorder
            res.render("disorders/show", {disorders: alldisorders,disorder: foundDisorder});
        }
      });
    }
  });
});

//EDIT Disorder ROUTE
router.get("/:id/edit", isLoggedIn, isVerified, isAdmin,function(req, res){
  Disorder.findById(req.params.id, function(err, foundDisorder){
    if (err) {
      console.log(err);    
    } else {
      res.render("disorders/edit", {disorder: foundDisorder});
    }
  });
});

// UPDATE Disorder ROUTE
router.put("/:id", isLoggedIn, isVerified, isAdmin, function(req, res){
    // find and update the correct Disorder
    // console.log(req.body.disorder);
    Disorder.findByIdAndUpdate(req.params.id, req.body.disorder, function(err, updatedDisorder){
       if(err){
          req.flash("error", err.message)
          res.redirect("back");
       } else {
           req.flash("success","Successfully Updated!");
           res.redirect("/disorders/" + req.params.id);
       }
    });
});

// DESTROY Disorder and its posts from the database
<<<<<<< HEAD
router.delete("/:id", middleware.isLoggedIn, middleware.checkDisorder, function(req, res) {
=======
router.delete("/:id", isLoggedIn, isVerified, isAdmin, function(req, res) {
>>>>>>> temp
  Disorder.findByIdAndRemove(req.params.id, function(err){
	  Post.remove({
	      _id: {
	        $in: req.disorder.posts
	      }
	    }, function(err) {
	      if(err) {
	        req.flash('error', err.message);
	        res.redirect('/');
	      } else {
	        req.disorder.remove(function(err) {
	          if(err) {
	              req.flash('error', err.message);
	              return res.redirect('/');
	          }
	          req.flash('error', 'Disorder deleted!');
	          res.redirect('/disorders');
	        });
	      }
	  });
	});
});


module.exports = router;
