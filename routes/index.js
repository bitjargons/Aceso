var express 	 = require('express');
var router  	 = express.Router();
var passport	 = require('passport');
var User 			 = require('../models/user');
var Memoir  	 = require('../models/memoir');
var middleware = require('../middleware');
var {isLoggedIn, checkUserMemoir, checkUserComment, isVerified, isAdmin, checkDisorder } = middleware;

//root route
router.get('/', function(req, res){
  res.render('landing');
});

router.get('/home', isLoggedIn, isVerified, function(req, res) {
  res.render('index')
});

router.get('/home/test', isLoggedIn, isVerified, function(req, res) {
  res.render('pgwbi')
});

// show register form
router.get('/register', function(req, res){
  res.render('register'); 
});

//handle sign up logic
router.post('/register', function(req, res){
  var newUser = new User({
    	rollno: req.body.rollno,
      email: req.body.email
  });
  if(req.body.adminCode === process.env.ADMIN_CODE) {
    newUser.isAdmin = true;
  } 
  User.register(newUser, req.body.password, function(err, user){
    if(err){
        req.flash('error', err.message);
        return res.render('register');
    }
    passport.authenticate('local')(req, res, function(){
       req.flash('success', 'Welcome to Aceso');
       res.redirect('users/' + user._id + '/verify'); 
    });
  });
});

//show login form
router.get('/login', function(req, res){
   res.render('login'); 
});

//handling login logic
router.post('/login', passport.authenticate('local', 
{
  failureFlash: true,
  successFlash: 'Welcome to Aceso!'
}), function(req, res){
  if(req.user.isAdmin)
    res.redirect('/dashboard');
  else {
    res.redirect('/home');
  }
});

// logout route
router.get('/logout', function(req, res){
   req.logout();
   req.flash('success', 'See you later!');
   res.redirect('/');
});

router.get('/about', function(req, res) {
  res.render('about')
});
module.exports = router;