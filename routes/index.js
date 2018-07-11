/**
 * File Name: index.js
 * Author Name: Henrique Oliveira
 * Website Name: Assignment 2 - NodeJS application using ExpressJS, MongoDB / Mongoose and EJS
 * File Description: view routing
 */

const express = require('express');
const viewsController = require('../controllers/viewsController');
const userController = require('../controllers/userController');

// Using router to handle different browser requests
const router = express.Router();

/* GET home page. */
router.get('/', viewsController.homePage);
router.get('/books', viewsController.getBooks);
router.get('/registration', userController.registerForm);
router.get('/admin/delete/:id', viewsController.deleteBook);

module.exports = router;
