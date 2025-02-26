const express = require('express');
const router = express.Router();
const user = require('../models/user');
const { getusers, getuser, createuser,updateUser,deleteUser } = require('../Controllers/users.controller.js');


//get all users
router.get('/', getusers);  // Fixed function name

//get user by id
router.get("/:id", getuser);  // Fixed function name

//create a user
router.post("/", createuser );  // Fixed function name

//update a user
router.put('/:id', updateUser); // Fixed function name

//delete a user 
router.delete('/:id', deleteUser); // Fixed function name

module.exports = router;
