var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');

// Passport dependencies
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const session = require('express-session');

//const localStrategy = require('passport-local').Strategy;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// Use mongoose to connect to mongodb
require('dotenv').config({ path: 'variables.env' });
const mongoose = require('mongoose'); 
mongoose.connect(process.env.DATABASE)
    .then(connection => {
      console.log('Connected to MongoDB')
    })
    .catch(error => {
      console.log(error.message)
     });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Takes raw requests and turns them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport configuration
app.use(
  session({
    secret: process.env.SECRET, // Do I need a random string here?
    resave: true,
    saveUninitialized: false
  })
);

// Initialize passport 
app.use(passport.initialize());
app.use(passport.session());

// Use the User model to manage users
const User = require('./models/User');
passport.use(User.createStrategy());

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
  passReqToCallback: true
},
  (request, accessToken, refreshToken, profile, done) => {
    User.findOrCreate({ username: profile.emails[0].value }, (err, user) =>
      done(err, user));
  }
));

// Read/write user login information to MongoDB
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/', indexRouter);
app.use('/users', usersRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  console.log(err);
  res.render('error', { title: err.message });
});

module.exports = app;
