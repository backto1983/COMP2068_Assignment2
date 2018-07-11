/**
 * File Name: userController.js
 * Author Name: Henrique Oliveira
 * Website Name: Assignment 2 - NodeJS application using ExpressJS, MongoDB / Mongoose and EJS
 * File Description: Logical javaScript statements to control user registration
 */

 // Link to User model
const user = require('../models/User');

  exports.getUsers = (req, res) => {
    user.find((err, users) => {
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
    const user = new User({ username: req.body.username });
  
    user.register(user, req.body.password, (err, account) => {
      if (err) {
        // Using "return" so Node doesn't complain that headers already sent
        return res.render('registration', {
          title: 'Registration',
          warning: 'Sorry, that username is already taken.  Try again.',
          user: req.user,
        });
      }
      next(); /* success */
    });
  };