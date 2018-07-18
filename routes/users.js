/**
 * File Name: users.js
 * Author Name: Henrique Oliveira
 * Website Name: Assignment 2 - NodeJS application using ExpressJS, MongoDB / Mongoose and EJS
 * File Description: Users routing
 */

const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

// Get users listing
router.get('/users', authController.isLoggedIn, userController.getUsers);

module.exports = router;
