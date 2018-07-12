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
  successRedirect: '/admin',
  failureRedirect: '/login',
  failureMessage: 'Invalid Login',
});