/**
 * File Name: authController.js
 * Author Name: Henrique Oliveira
 * Website Name: Assignment 2 - NodeJS application using ExpressJS, MongoDB / Mongoose and EJS
 * File Description: Logical javaScript statements to control user authentication
 */

const passport = require('passport');
const mongoose = require('mongoose');

const User = require('../models/User');

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
    return;
  }
  res.redirect('/login');
};

exports.login = passport.authenticate('local', {
  successRedirect: '/users',
  failureRedirect: '/login',
  failureMessage: 'Invalid Login',
});

exports.googlePre = passport.authenticate('google', {
  scope: [
    'https://www.googleapis.com/auth/plus.login',
    'https://www.googleapis.com/auth/plus.profile.emails.read',
  ],
});

exports.googlePost = passport.authenticate('google', {
  successRedirect: '/books',
  failureRedirect: '/login',
});

exports.microsoftPre = passport.authenticate('microsoft', {
  scope: [
    'openid',
    'offline_access',
    //'https://www.googleapis.com/auth/plus.profile.emails.read',
  ],
});

exports.microsoftPost = passport.authenticate('microsoft', {
  successRedirect: '/books',
  failureRedirect: '/login',
});