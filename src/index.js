
// Main file that starts the server

const express = require('express');
const cors = require('cors');
const cookoieParser = require('cookie-parser');
const helmet = require('helmet');
const mongoose = require('mongoose');
 require("dotenv").config();
 const user = require('./models/user.js');
 const app = express();



app.use(cors());
app.use(express.json());
app.use(cookoieParser());
app.use(helmet());



app.get('/', (req, res) => {
  res.json("Welcome to the API");
});


app.get('/api/users', async (req, res) => {
  try {
    const newUser = await user.find(req.body); // Fixed variable naming
    res.status(201).json({ user: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.get('/api/user/:id', async (req, res) => {
  try {
    const newUser = await user.findById(req.params.id); // Fixed variable naming
    res.status(201).json({ user: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});  
  


//update a user
app.put('/api/user/:id', async (req, res) => {
  try {
    const User = await user.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Fixed variable naming  
    if (!User) {
      return res.status(404).json({ message: 'User not found' });
    }
    const updatedUser = await User.findById();
    res.status(201).json({ user: updatedUser });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.post('/api/users', async (req, res) => {
  try {
    const newUser = await user.create(req.body); // Fixed variable naming
    res.status(201).json({ user: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});




mongoose.connect("mongodb+srv://kemshuggs:Mypassword2025@backenddb.ffddu.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB")
  .then(() => {
    console.log("Connected to dataBase!");
    // Launch server
    app.listen(port, () => {
      console.log(`Server is running on port 5000`);
    });
  })
  .catch(() => {
    console.log("connection failed!");
  });

const port = process.env.PORT || 5000;
  













   const users = require('./Routers/users');
   app.use('/users', users);

   const authRoutes = require('./Routers/auth');
   app.use('/auth', authRoutes);
  
   const uplaodRoutes = require('./Routers/auth');
   app.use('/uplaod', uplaodRoutes);


