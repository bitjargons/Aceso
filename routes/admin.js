var express     = require("express");
var router      = express.Router();
var passport    = require("passport");
var User        = require("../models/user");
var Memoir      = require("../models/memoir");
var Disorder    = require("../models/disorder");
var Comment     = require("../models/comment");
var Test        = require("../models/test");
var Post        = require("../models/post");
var middleware  = require("../middleware");
var request     = require("request");
var {isLoggedIn, checkUserMemoir, checkUserComment, isVerified, isAdmin, checkDisorder} = middleware;

//Index
router.get("/",isLoggedIn, isVerified, isAdmin, function(req, res) {
  res.render("dashboard/index");
});

//Disorders
router.get("/disorders", isLoggedIn, isVerified, isAdmin, function(req, res) {
    // Get 
    Disorder.find({}, function(err, allDisorders){
        if(err){s
          console.log(err);
        } else {
          res.render("dashboard/disorder", {disorders:allDisorders, page: "dashboard"});
        }
    });
});

//New Disorders
router.post("/disorders/new", isLoggedIn, isVerified, isAdmin, function(req, res) {
  var num = req.body.memno;
  res.render("dashboard/newdisorder", {fields: num, page:"newdisorders"})
});

//Create Disorders
router.post("/disorders", isLoggedIn, isVerified, isAdmin, function(req, res) {
  var fields = req.body.fields;
  var disorders = [];
  for(var i = 0; i < fields; i++) {
    var m = "disorder" + i;
    disorders.push(req.body[m]);
  }
  Disorder.collection.insert(disorders, function(err, docs) {
    if(err) {
    	console.log(err);
    	req.flash("error", err.msg);
    	res.redirect("back");
    } else {
    	req.flash("success", "Successfully added!");
    	res.redirect("/dashboard/disorders");
    }
  })
});

//Edit Disorders
router.get("/disorders/edit/:id", isLoggedIn, isVerified, isAdmin, function(req, res){
  Disorder.findById(req.params.id, function(err, foundDisorder){
    if (err) {
      console.log(err);    
    } else {
      res.render("dashboard/editdisorder", {disorder: foundDisorder});
    }
  });
});

//Update Disorders
router.put("/disorders/:id", isLoggedIn, isVerified, isAdmin,function(req, res){
    // find and update the correct Disorder
    // console.log(req.body.disorder);
    Disorder.findByIdAndUpdate(req.params.id, req.body.disorder, function(err, updatedDisorder){
       if(err){
          req.flash("error", err.message)
          res.redirect("back");
       } else {
           req.flash("success","Successfully Updated!");
           res.redirect("/dashboard/disorders");
       }
    });
});

// DESTROY Disorders
router.delete("/disorders/:id", isLoggedIn, isAdmin, checkDisorder, function(req, res) {
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
            res.redirect('/dashboard/disorders');
          });
        }
    });
  });
});

//Show Posts
router.get("/posts", isLoggedIn, isAdmin, function(req, res) {
  Post.find({}, function(err, allPosts){
    if(err){
      console.log(err);
    } else {
      res.render("dashboard/post", {posts:allPosts, page: "posts"});
    }
  });
});

//New Posts
router.post("/posts/new", isLoggedIn, isAdmin, function(req, res) {
  var num = req.body.memno;
  var disorders = Disorder.find({}, function(err, allDisorders){
    if(err) {
      console.log(err);
    } else {
      res.render("dashboard/newpost", {fields: num, disorders: allDisorders, page:"newposts"})
    }
  }) 
});

// EDIT Memoir ROUTE
router.get("/posts/edit/:id", isLoggedIn , isAdmin, function(req, res){
  Post.findById(req.params.id, function(err, foundPost){
    if (err) {
      console.log(err);    
    } else {
      res.render("dashboard/editpost", {post: foundPost});
    }
  });
});

// UPDATE Post ROUTE
router.put("/posts/:id", isLoggedIn, isVerified, isAdmin,function(req, res){
    // find and update the correct Post
    // console.log(req.body.post);
    Post.findByIdAndUpdate(req.params.id, req.body.post, function(err, updatedPost){
       if(err){
          req.flash("error", err.message)
          res.redirect("back");
       } else {
           req.flash("success","Successfully Updated!");
           res.redirect("/dashboard/posts/");
       }
    });
});

//DESTROY Post from the database
router.delete("/posts/:id", isLoggedIn, isAdmin, function(req, res) {
  Post.findByIdAndRemove(req.params.id, function(err){
    if(err) {
      req.flash('error', err.message);
      res.redirect('/');
    } else {
      req.flash('error', 'Posts deleted!');
      res.redirect('/dashboard/posts');
    }
  });
});

//Memoirs
router.get("/memoirs", isLoggedIn, isAdmin, function(req, res) {
  Memoir.find({}, function(err, allMemoirs){
    if(err){
      console.log(err);
    } else {
      res.render("dashboard/memoir", {memoirs:allMemoirs, page: "memoirs"});
    }
  });
});

//EDIT Memoir ROUTE
router.get("/memoirs/edit/:id", isLoggedIn ,checkUserMemoir , function(req, res){
  Memoir.findById(req.params.id, function(err, foundMemoir){
    if (err) {
      console.log(err);    
    } else {
      res.render("dashboard/editmemoir", {memoir: foundMemoir});
    }
  });
});

//UPDATE Memoir ROUTE
router.put("/memoirs/:id", isLoggedIn, isVerified, isAdmin,function(req, res){
    // find and update the correct Memoir
    // console.log(req.body.memoir);
    Memoir.findByIdAndUpdate(req.params.id, req.body.memoir, function(err, updatedMemoir){
       if(err){
          req.flash("error", err.message)
          res.redirect("back");
       } else {
           req.flash("success","Successfully Updated!");
           res.redirect("/dashboard/memoirs/");
       }
    });
});

// DESTROY Memoir and its comments from the database
router.delete("/memoirs/:id", isLoggedIn, isVerified, isAdmin, checkUserMemoir, function(req, res) {
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
          res.redirect('/dashboard/memoirs');
        });
      }
  })
});

//List
router.get("/lists", isLoggedIn, isAdmin, function(req, res) {
  Test.find({isCritical: true}, function(err, foundTests) {
    if(err) {
      console.log("Something bad happened");
    }
    else {
      res.render("dashboard/list", {tests: foundTests})
    }
  })
});

module.exports = router;