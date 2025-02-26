// Authentication routes
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { register, login,generateToken } = require('../controllers/authController.js');
const user = require('../models/user');


// Register a user
router.post('/register', register);

// Login a user
router.post('/login', login);

// Generate a token

router.post('/token', (req, res) => generateToken(req, res));


module.exports = router;
