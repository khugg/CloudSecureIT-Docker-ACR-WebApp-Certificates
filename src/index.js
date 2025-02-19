
// Main file that starts the server

const express = require('express');
const cors = require('cors');
const cookoieParser = require('cookie-parser');
const helmet = require('helmet');
const mongoose = require('mongoose');
const usersRoute = require('./Routers/users.routes.js');
 require("dotenv").config();
 const user = require('./models/user.js');
 const app = express();

// Middleware
 app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use('/api/users', usersRoute);




app.use(cors());
app.use(cookoieParser());
app.use(helmet());



app.get('/', (req, res) => {
  res.json("Welcome to the API");
});

//create a user
app.get('/api/users', async (req, res) => {
  try {
    const newUser = await user.find(req.body); // Fixed variable naming
    res.status(201).json({ user: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get user by id
app.get('/api/users/:id', async (req, res) => {
  try {
    const newUser = await user.findById(req.params.id); // Fixed variable naming
    res.status(201).json({ user: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});  
  


//update a user
app.put('/api/users/:id', async (req, res) => {
  try {
    const updatedUser = await user.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Fixed variable naming  
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(201).json({ message: 'User create successfully' });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



//delete a user 

app.delete('/api/users/:id', async (req, res) => {
  try {
    const deletedUser = await user.findByIdAndDelete(req.params.id); // Fixed variable naming
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(201).json({message: 'user delete successfully' });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


//create a user
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
  





   const users = require('./Routers/users.routes.js');
   app.use('/users', users);

   const authRoutes = require('./Routers/auth');
   app.use('/auth', authRoutes);
  
   const uplaodRoutes = require('./Routers/auth');
   app.use('/uplaod', uplaodRoutes);


