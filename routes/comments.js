var express = require("express");
var router  = express.Router({mergeParams: true});
var Memoir = require("../models/memoir");
var Comment = require("../models/comment");
var middleware = require("../middleware");
var {isLoggedIn, checkUserMemoir, checkUserComment, isVerified, isAdmin } = middleware;

//Comments New
router.get("/new", isLoggedIn, isVerified, function(req, res){
    // find memoir by id
    Memoir.findById(req.params.id, function(err, memoir){
        if(err){
            console.log(err);
        } else {
             res.render("comments/new", {memoir: memoir});
        }
    })
});

//Comments Create
router.post("/", isLoggedIn, isVerified, function(req, res){
   //lookup memoir using ID
   Memoir.findById(req.params.id, function(err, memoir){
       if(err){
           console.log(err);
           res.redirect("/memoirs");
       } else {
        Comment.create(req.body.comment, function(err, comment){
           if(err){
              req.flash("error", "Something went wrong");
               console.log(err);
           } else {
               //add username and id to comment
               comment.author.id = req.user._id;
               comment.author.username = req.user.username;
               //save comment
               comment.save();
               memoir.comments.push(comment._id);
               memoir.save();
               req.flash("success", "Successfully added comment");
               res.redirect('/memoirs/' + memoir._id);
           }
        });
       }
   });
});

// COMMENT EDIT ROUTE
router.get("/:comment_id/edit", isLoggedIn, isVerified,checkUserComment, function(req, res){
   Memoir.findById(req.params.id, function(err, foundMemoir){
      if(err || !foundMemoir) {
        req.flash("error", "No memoir found");
        return res.redirect("back");
      } else {
        Comment.findById(req.params.comment_id, function(err, foundComment){
          if(err) {
              res.redirect("back");
          } else {
              res.render("comments/edit", {memoir_id: req.params.id, comment: foundComment});
          }
        });
      }
   });
});

// COMMENT UPDATE
router.put("/:comment_id", isLoggedIn, isVerified ,checkUserComment, function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
      if(err){
          res.redirect("back");
      } else {
          res.redirect("/memoirs/" + req.params.id );
      }
   });
});

// COMMENT DESTROY ROUTE
router.delete("/:comment_id", isLoggedIn, isVerified ,checkUserComment, function(req, res){
  // // find memoir, remove comment from comments array, delete comment in db
  // Memoir.findByIdAndUpdate(req.params.id, {
  //   $pull: {
  //     comments: req.comment._id
  //   }
  // }, function(err) {
  //   if(err) {
  //     console.log(err);
  //     req.flash("error", err.message);
  //     return res.redirect('/');
  //   } else {
  //     req.comment.remove(function(err) {
  //       if(err) {
  //         req.flash('error', 'Comment deleted!');
  //         res.redirect("/memoirs/" + req.params.id);
  //       }
  //     });
  //   }
  // });
  //findByIdAndRemove
  Comment.findByIdAndRemove(req.params.comment_id ,function(err){
     if(err){
         res.redirect("back");
     } else {
         req.flash("success", "Comment Deleted");
         res.redirect("/memoirs/" + req.params.id);
     }
  });
});

module.exports = router;