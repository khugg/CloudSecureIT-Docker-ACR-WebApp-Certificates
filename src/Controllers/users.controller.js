const user = require('../models/user');

// get all users
const getusers = async (req, res) => {
    try {
        const users = await user.find();
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
 }
 // get user by id
const getuser = async (req, res) => {
    try {
        const newUser = await user.findById(req.params.id); // Fixed variable naming
        res.status(201).json({ user: newUser });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    };
    
    //create a user
    const createuser = async (req, res) => {
        try {
            const newUser = await user.create(req.body); // Fixed variable naming
            res.status(201).json({ user: newUser });
          } catch (error) {
            res.status(500).json({ message: error.message });
          }
        };

            //update a user
        const updateUser = async (req, res) => {
            try {
                const updatedUser = await user.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Fixed variable naming  
                if (!user) {
                  return res.status(404).json({ message: 'User not found' });
                }
                res.status(200).json({ message: 'User updated successfully', user: updatedUser });
                
              } catch (error) {
                res.status(500).json({ message: error.message });
              } 
            };


//delete a user
            const deleteUser = async (req, res) => {
                try {
                    const deletedUser = await user.findByIdAndDelete(req.params.id); // Fixed variable naming
                    if (!deletedUser) {
                      return res.status(404).json({ message: 'User not found' });
                    }
                    res.status(200).json({ message: 'User deleted successfully' });
                    
                  } catch (error) {
                    res.status(500).json({ message: error.message });
                  }
                }

 module.exports = {
     getusers,
     getuser,
     createuser,
     updateUser,
     deleteUser,
     };