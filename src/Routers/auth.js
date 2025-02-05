// Authentication routes
const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// Route d'inscription
router.post('/register', (req, res) => {
    res.json('');
  });

// Route de connexion
router.get('/login', (req, res) => {
    res.json('List of Login POST request received users');
  });
module.exports = router;