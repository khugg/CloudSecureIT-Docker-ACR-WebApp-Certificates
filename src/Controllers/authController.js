const user = require('../models/user'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { FirstName, LastName, emailAddress, documentType, filePath } = req.body ;
    
        if (!FirstName || !LastName || !emailAddress || !documentType || !filePath) {
            return res.status(400).json({ message : "All fields are required" }) ;
        }
    
        const userExists = await user.findOne({ emailAddress });
        if (userExists) {
            return res.status(400).json({ message : "This user already exists" }) ;
        }
      
        const newUser = new user({ 
            FirstName, 
            LastName, 
            emailAddress, 
            documentType, 
            filePath
        });
        
        await newUser.save();

        res.status(201).json({ message: "User registered successfully!" }) ;
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message }) ;
    }
}

const login = async (req, res) => {
    try {
        const { emailAddress} = req.body;

        if (!emailAddress) {
            return res.status(400).json({ message: "Email are required" });
        }

        const userFound  = await user.findOne({ emailAddress });
        if (!userFound ) {
            return res.status(404).json({ message: "User not found" });
        }


        // Generate token JWT
        const token = jwt.sign(
            { id: user._id, emailAddress: userFound.emailAddress },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({ message: "User logged in successfully", token });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
        
     
module.exports = { 
    register,
    login,
};
