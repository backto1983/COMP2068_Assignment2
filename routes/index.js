/**
 * File Name: index.js
 * Author Name: Henrique Oliveira
 * Website Name: Assignment 2 - NodeJS application using ExpressJS, MongoDB / Mongoose and EJS
 * File Description: view routing
 */

const express = require('express');
const viewsController = require('../controllers/viewsController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

// Using router to handle different browser requests
const router = express.Router();

// Get users listing
router.get('/users', userController.getUsers);

/* GET home page. */
router.get('/', viewsController.homePage);
router.get('/books', viewsController.getBooks);

router.get('/registration', userController.registerForm);
router.post('/registration', userController.register, authController.login); 

router.get('/login', userController.loginForm);
router.post('/login', authController.login);

router.get('/google', authController.googlePre);
router.get('/google/callback', authController.googlePost);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

router.get('/admin/delete/:id', viewsController.deleteBook);

module.exports = router;
