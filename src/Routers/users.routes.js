const express = require('express');
const router = express.Router();
const user = require('../models/user');
const { getusers, getuser, createuser } = require('../Controllers/users.controller.js');



router.get('/', getusers);

router.get("/:id", getuser);

router.post("/", createuser );  // Fixed function name
module.exports = router;