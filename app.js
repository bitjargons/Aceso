var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    flash           = require("connect-flash"),
    passport        = require("passport"),
    cookieParser    = require("cookie-parser"),
    LocalStrategy   = require("passport-local"),
    methodOverride  = require("method-override"),
    User            = require("./models/user"),
    Memoir          = require("./models/memoir"),
    Comment         = require("./models/comment"),
    Disorder        = require("./models/disorder"),
    Post            = require("./models/post"),
    timeout         = require('connect-timeout')
    Feedback        = require("./models/feedback")
    // seedDB          = require("./seeds")
    
// configure dotenv
require('dotenv').load();

//requiring routes
var commentRoutes    = require("./routes/comments"),
    memoirRoutes     = require("./routes/memoirs"),
    postRoutes       = require("./routes/posts")
    disorderRoutes   = require("./routes/disorders"),
    indexRoutes      = require("./routes/index"),
    userRoutes       = require("./routes/user"),
    adminRoutes      = require("./routes/admin"),
    feedbackRoutes   = require("./routes/feedbacks")

// assign mongoose promise library and connect to database
const databaseUri = process.env.MONGOLAB_URL;
console.log(process.env.MONGOLAB_URL);

mongoose.connect(databaseUri)
      .then(() => console.log(`Database connected`))
      .catch(err => console.log(`Database connection error: ${err.message}`));

app.use(timeout('30s'));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(haltOnTimedout);
app.use(cookieParser('secret'));
app.use(haltOnTimedout);
app.use(flash());

//require moment
app.locals.moment = require('moment');
// seedDB(); //seed the database

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: process.env.PASSPORT_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

app.use("/", indexRoutes);
app.use("/memoirs", memoirRoutes);
app.use("/memoirs/:id/comments", commentRoutes);
app.use("/disorders", disorderRoutes);
app.use("/disorders/:id/posts", postRoutes);
app.use("/", userRoutes);
app.use("/dashboard/", adminRoutes);
app.use("/feedbacks", feedbackRoutes);

function haltOnTimedout (req, res, next) {
  if (!req.timedout) next()
}

app.listen(process.env.PORT || 7890, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});