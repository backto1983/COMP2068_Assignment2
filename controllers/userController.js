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

exports.validate_passwords = (req, res, next) => {
  const input_field_1 = document.getElementById("password");
  const input_field_2 = document.getElementById("confirm_password");

  if(input_field_1.value == input_field_2.value) {
    
    alert("Passwords matched !");
  
    // Your further processing with the form goes here...
  
  }
  
  else{
    alert("Passwords do not match !");
  };
  return false;
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