/**
 * File Name: userController.js
 * Author Name: Henrique Oliveira
 * Website Name: Assignment 2 - NodeJS application using ExpressJS, MongoDB / Mongoose and EJS
 * File Description: Logical javaScript statements to control user registration/login
 */

 // Link to User model
const User = require('../models/User');

exports.getUsers = (req, res) => {
  User.find((err, users) => {
    if (err) {
      res.render('error');
    } else {
      res.render('users', {
        title: 'All Users',
        users,
        user: req.user,
      });
    }
  });
};

exports.registerForm = (req, res) => {
  res.render('registration', {
    title: 'Registration',
    warning: '',
    user: req.user,
  });
};

exports.register = (req, res, next) => {
  const newUser = new User({ username: req.body.username });

  User.register(newUser, req.body.password, (err, account) => {
    if (err) {
      // Using "return" so Node doesn't complain that headers already sent
      return res.render('registration', {
        title: 'Registration',
        warning: 'Sorry, that username is already taken; try again.',
        user: req.user,
      });
    }
    res.redirect('/login'); // Success
  });
};  
  
exports.loginForm = (req, res) => {
  const messages = req.session.messages || [];

  // Clear session message
  req.session.messages = [];

  res.render('login', {
    title: 'Login',
    messages,
    user: req.user,
  });  
};

exports.deleteUser = (req, res) => {
  User.findByIdAndRemove(
    { _id: req.params.id },
    async (err, userJustDeleted) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect('/users');
      }
    },
  );
};