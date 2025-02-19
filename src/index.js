
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
 const passport = require('passport');

// Middleware
 app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookoieParser());
app.use(helmet());
app.use(passport.initialize());

//routes
app.use('/api/users', usersRoute);
app.use('/api/auth', require('./Routers/auth'));
app.use('/api/upload', require('./Routers/upload'));





app.get('/', (req, res) => {
  res.json("Welcome to the API");
});




// Connect to database

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


