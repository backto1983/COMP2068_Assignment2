const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

// Get users listing
router.get('/users', userController.getUsers);

module.exports = router;
