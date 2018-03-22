var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Memoir = require("../models/memoir");
var Disorder = require("../models/disorder");
var Comment = require("../models/comment");
var Post = require("../models/post");
var middleware = require("../middleware");
var request = require("request");
var app = express();


//INDEX
router.get("/", middleware.isLoggedIn, middleware.isAdmin ,function(req, res) {
    // Get 
    Disorder.find({}, function(err, allDisorders){
        if(err){s
          console.log(err);
        } else {
          res.render("dashboard/index", {disorders:allDisorders, page: "dashboard"});
        }
    });
});

//New Disorders
router.post("/disorders/add", middleware.isLoggedIn, middleware.isAdmin, function(req, res) {
  var num = req.body.memno;
  res.render("dashboard/adddisorder", {fields: num, page:"adddisorders"})
});

//Create Disorders
router.post("/", middleware.isLoggedIn, middleware.isAdmin, function(req, res) {
  var names = req.body.disorders.name;
  var descs = req.body.disorders.desc;
  var images = req.body.disorders.image;
  var author = {
        id: req.user._id,
        username: req.user.username
  }
  console.log(names);
  var newDisorders = [];
  names.forEach(function(name){
    var newDisorder = {name: name, image: image, description: desc, author:author}
    newDisorders.push(name);
  })

  descs.forEach(function(desc){
    newDisorders.push(desc);
  })
  // for(var i = 0; i < names.length; i++) {
  //   var newMemoir = {name: names[i], image: images[i], description: descs[i], author:author};
  //   newDisorders.push(newDisorder);
  // }
  res.send(newDisorders);
})

// EDIT Disorder ROUTE
router.get("/disorders/edit/:id", middleware.isLoggedIn , function(req, res){
  Disorder.findById(req.params.id, function(err, foundDisorder){
    if (err) {
      console.log(err);    
    } else {
      res.render("dashboard/editdisorder", {disorder: foundDisorder});
    }
  });
});

// UPDATE Disorder ROUTE
router.put("/:id", function(req, res){
    // find and update the correct Disorder
    // console.log(req.body.disorder);
    Disorder.findByIdAndUpdate(req.params.id, req.body.disorder, function(err, updatedDisorder){
       if(err){
          req.flash("error", err.message)
          res.redirect("back");
       } else {
           req.flash("success","Successfully Updated!");
           res.redirect("/dashboard/");
       }
    });
});

// DESTROY Disorder and its posts from the database
router.delete("/:id", middleware.isLoggedIn, middleware.isAdmin, middleware.checkDisorder, function(req, res) {
  Disorder.findByIdAndRemove(req.params.id, function(err){
  //   Post.remove({
  //       _id: {
  //         $in: req.disorder.posts
  //       }
  //     }, function(err) {
  //       if(err) {
  //         req.flash('error', err.message);
  //         res.redirect('/');
  //       } else {
  //         req.disorder.remove(function(err) {
  //           if(err) {
  //               req.flash('error', err.message);
  //               return res.redirect('/');
  //           }
  //           req.flash('error', 'Disorder deleted!');
  //           res.redirect('/disorders');
  //         });
  //       }
  //   });
    if(err) {
      req.flash('error', err.message);
      res.redirect('/');
    } else {
      req.flash('error', 'Disorder deleted!');
      res.redirect('/dashboard/');
    }
  });
});

//POSTS
router.get("/posts", middleware.isLoggedIn, middleware.isAdmin, function(req, res) {
  Post.find({}, function(err, allPosts){
    if(err){
      console.log(err);
    } else {
      res.render("dashboard/post", {posts:allPosts, page: "posts"});
    }
  });
});

//New Posts
router.post("/posts/add", middleware.isLoggedIn, middleware.isAdmin, function(req, res) {
  var num = req.body.memno;
  var disorders = Disorder.find({}, function(err, allDisorders){
    if(err) {
      console.log(err);
      res.send("Shit happened");
    } else {
      res.render("dashboard/addpost", {fields: num, disorders: allDisorders, page:"addposts"})
    }
  }) 
});

// EDIT Memoir ROUTE
router.get("/posts/edit/:id", middleware.isLoggedIn , middleware.isAdmin, function(req, res){
  Post.findById(req.params.id, function(err, foundPost){
    if (err) {
      console.log(err);    
    } else {
      res.render("dashboard/editpost", {post: foundPost});
    }
  });
});

// UPDATE Post ROUTE
router.put("/posts/:id", function(req, res){
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

// DESTROY Post from the database
router.delete("/posts/:id", middleware.isLoggedIn, middleware.isAdmin, function(req, res) {
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
router.get("/memoirs", middleware.isLoggedIn, middleware.isAdmin, function(req, res) {
  Memoir.find({}, function(err, allMemoirs){
    if(err){
      console.log(err);
    } else {
      res.render("dashboard/memoir", {memoirs:allMemoirs, page: "memoirs"});
    }
  });
});

//New Memoirs
router.post("/memoirs/add", middleware.isLoggedIn, middleware.isAdmin, function(req, res) {
  var num = req.body.memno;
  res.render("dashboard/addmemoir", {fields: num, page:"addmemoirs"})
});

//Create Memoirs
router.post("/memoirs", middleware.isLoggedIn, middleware.isAdmin, function(req, res) {
  var newMemoirs = req.body.memoirs;
  // for(var i = 0; i < names.length; i++) {
  //   var newMemoir = {name: names[i], image: images[i], description: descs[i], author:author};
  //   newMemoirs.push(newMemoir);
  // }
  res.send(newMemoirs);
})

// EDIT Memoir ROUTE
router.get("/memoirs/edit/:id", middleware.isLoggedIn ,middleware.checkUserMemoir , function(req, res){
  Memoir.findById(req.params.id, function(err, foundMemoir){
    if (err) {
      console.log(err);    
    } else {
      res.render("dashboard/editmemoir", {memoir: foundMemoir});
    }
  });
});

// UPDATE Memoir ROUTE
router.put("/memoirs/:id", function(req, res){
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
// DESTROY Disorder and its posts from the database
router.delete("/:id", middleware.isLoggedIn, middleware.isVerified, middleware.checkDisorder, middleware.isAdmin, function(req, res) {
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