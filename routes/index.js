/**
 * File Name: index.js
 * Author Name: Henrique Oliveira
 * Website Name: Assignment 2 - NodeJS application using ExpressJS, MongoDB / Mongoose and EJS
 * File Description: View routing
 */

const express = require('express');
const viewsController = require('../controllers/viewsController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

// Using router to handle different browser requests
const router = express.Router();

// Get users listing; isLoggedIn function is responsible for not letting unlogged visitors to access users.ejs
router.get('/users', authController.isLoggedIn, userController.getUsers);

router.get('/admin/delete/:id', userController.deleteUser);

/* GET home page. */
router.get('/', viewsController.homePage);
router.get('/books', viewsController.getBooks);

router.get('/addBook', authController.isLoggedIn, viewsController.addBook);
router.post('/addBook', authController.isLoggedIn, viewsController.createBook);

router.get('/admin/delete/:id', viewsController.deleteBook);

router.get('/admin/edit/:id', authController.isLoggedIn, viewsController.editBook);
router.post('/admin/edit/:id', authController.isLoggedIn, viewsController.updateBook);

router.get('/registration', userController.registerForm);
router.post('/registration', userController.register, authController.login); 

router.get('/login', userController.loginForm);
router.post('/login', authController.login);

router.get('/google', authController.googlePre);
router.get('/google/callback', authController.googlePost);

router.get('/microsoft', authController.microsoftPre);
router.get('/microsoft/callback', authController.microsoftPost);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

module.exports = router;
