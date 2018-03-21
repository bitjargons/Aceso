var express = require("express");
var router  = express.Router({mergeParams: true});
var Disorder = require("../models/disorder");
var Post = require("../models/post");
var middleware = require("../middleware");
var {isLoggedIn, checkUserMemoir, checkUserComment, isVerified, isAdmin } = middleware;

//NEW
router.get("/new", isLoggedIn, isVerified, isAdmin, function(req, res){
    // find disorder by id
    Disorder.findById(req.params.id, function(err, disorder){
      if(err){
          console.log(err);
      } else {
           res.render("posts/new", {disorder: disorder});
      }
    })
});

//CREATE
router.post("/", isLoggedIn, isVerified, isAdmin, function(req, res){
   //lookup disorder using ID
   Disorder.findById(req.params.id, function(err, disorder){
     if(err){
         console.log(err);
         res.redirect("/disorders");
     } else {
      Post.create(req.body.post, function(err, post){
         if(err){
            req.flash("error", "Something went wrong");
             console.log(err);
         } else {
             //add username and id to post
             post.parent.id = disorder._id;
             post.parent.disorder = disorder.name;
             //save post
             post.save();
             disorder.posts.push(post._id);
             disorder.save();
             console.log(disorder);
             console.log(post);
             req.flash("success", "Successfully added post");
             res.redirect('/disorders/' + disorder._id);
         }
      });
     }
   });
});

//SHOW
router.get("/:post_id", isLoggedIn, isVerified, function(req, res){
    //find the Disorder with provided ID
    Post.findById(req.params.post_id, function(err, foundPost){
        if(err || !foundPost){
            console.log(err);
            req.flash('error', 'Sorry, that post does not exist!');
            return res.redirect('/');
        } else {
            res.render("posts/show", {post: foundPost, disorder_id: req.params.id});
        }
    });
});

//EDIT
router.get("/:post_id/edit", isLoggedIn, isVerified, isAdmin, function(req, res){
   Disorder.findById(req.params.id, function(err, foundDisorder){
      if(err || !foundDisorder) {
        req.flash("error", "No disorder found");
        return res.redirect("back");
      } else {
        Post.findById(req.params.post_id, function(err, foundPost){
          if(err) {
              res.redirect("back");
          } else {
              res.render("posts/edit", {disorder_id: req.params.id, post: foundPost});
          }
        });
      }
   });
});

//UPDATE
router.put("/:post_id", isLoggedIn, isVerified, isAdmin ,function(req, res){
   Post.findByIdAndUpdate(req.params.post_id, req.body.post, function(err, updatedPost){
      if(err){
          res.redirect("back");
      } else {
          res.redirect("/disorders/" + req.params.id );
      }
   });
});

//DESTROY
router.delete("/:post_id", function(req, res){
  // // find disorder, remove post from posts array, delete post in db
  // Disorder.findByIdAndUpdate(req.params.id, {
  //   $pull: {
  //     posts: req.post._id
  //   }
  // }, function(err) {
  //   if(err) {
  //     console.log(err);
  //     req.flash("error", err.message);
  //     return res.redirect('/');
  //   } else {
  //     req.post.remove(function(err) {
  //       if(err) {
  //         req.flash('error', 'Post deleted!');
  //         res.redirect("/disorders/" + req.params.id);
  //       }
  //     });
  //   }
  // });
  //findByIdAndRemove
  Post.findByIdAndRemove(req.params.post_id ,function(err){
     if(err){
         res.redirect("back");
     } else {
         req.flash("success", "Post Deleted");
         res.redirect("/disorders/" + req.params.id);
     }
  });
});

//LINKS
router.post("/:post_id/addlink", function(req, res){
    //find the Disorder with provided ID
    Post.findById(req.params.post_id, function(err, foundPost){
        if(err || !foundPost){
            console.log(err);
            req.flash('error', 'Sorry, that post does not exist!');
            return res.redirect('/posts');
        } else {
            foundPost.links.push(req.body.link);
            foundPost.save();
            // console.log(foundPost);
            res.redirect('/disorders/'+req.params.id+'/posts/'+req.params.post_id);
        }
    });
});

module.exports = router;