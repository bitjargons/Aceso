var express 	 = require("express");
var router  	 = express.Router();
var passport 	 = require("passport");
var User 			 = require("../models/user");
var Memoir 		 = require("../models/memoir");
var async    	 = require("async");
var nodemailer = require("nodemailer");
var crypto 		 = require("crypto");

//Changes has to be made for not letting anyone access verify page of any other user

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

router.get('/users/:id/verify', function(req, res) {
  User.findById(req.params.id, function(err, foundUser) {
    if(err) {
      console.log(err+"Something");
      req.flash("error", "Something went wrong");
      res.redirect("/");
    } else {
      if(foundUser.isVerified) {
        res.render('index', {page: "home"})
      }
      res.render('users/verify', {user: foundUser});
    }
  })
});

router.post('/users/:id/verify', function(req, res, next) {
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      User.findOne({ email: req.body.email }, function(err, user) {
        if (!user) {
          req.flash('error', 'No account with that email address exists.');
          return res.redirect('back');
        }

        user.fillDetailsToken = token;
        user.fillDetailsExpires = Date.now() + 3600000; // 1 hour

        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
    function(token, user, done) {
      var smtpTransport = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD
        }
      });
      var mailOptions = {
        to: user.email,
        from: process.env.EMAIL,
        subject: 'Aceso Account Verification',
        text: 'You are receiving this because you (or someone else) have requested to fill the details of your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/users/' + user._id + '/details/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        console.log('mail sent');
        req.flash('success', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
        done(err, 'done');
      });
    }
  ], function(err) {
    if (err) return next(err);
      res.redirect('back');
  });
});

router.get('/users/:id/details/:token', function(req, res) {
  User.findOne({ fillDetailsToken: req.params.token, fillDetailsExpires: { $gt: Date.now() } }, function(err, user) {
    if (!user) {
      req.flash('error', 'Fill Details token is invalid or has expired.');
      return res.redirect('back');
    }
    res.render('users/details', {id: req.params.id,token: req.params.token});
  });
});

router.post('/users/:id/details/:token', function(req, res) {
  async.waterfall([
    function(done) {
      User.findOne({ fillDetailsToken: req.params.token, fillDetailsExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
          req.flash('error', 'Password details token is invalid or has expired.');
          return res.redirect('back');
        }
        if(req.body.password === req.body.confirm) {
          user.setPassword(req.body.password, function(err) {
            user.fillDetailsToken = 	undefined;
            user.fillDetailsExpires = undefined;
            user.details = req.body.details;
            user.isVerified = true;
            user.save(function(err) {
              req.logIn(user, function(err) {
                done(err, user);
              });
            });
          })
        } else {
            req.flash("error", "Passwords do not match.");
            return res.redirect('back');
        }
      });
    },
    function(user, done) {
      var smtpTransport = nodemailer.createTransport({
        service: 'Gmail', 
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD
        }
      });
      var mailOptions = {
        to: user.email,
        from: process.env.EMAIL,
        subject: 'Your account has been verified',
        text: 'Hello,\n\n' +
          'This is a confirmation that the account associated with ' + user.email + ' has just been verified.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        req.flash('success', 'Success! Your account has been verified.');
        done(err);
      });
    }
  ], function(err) {
    res.redirect('/home');
  });
});

module.exports = router;