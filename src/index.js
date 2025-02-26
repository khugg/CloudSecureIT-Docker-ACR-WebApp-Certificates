
// Main file that starts the server

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const mongoose = require('mongoose');
const usersRoute = require('./Routers/users.routes.js');
 const user = require('./models/user.js');
 const app = express();
 const passport = require('passport');
const dotenv = require('dotenv');
dotenv.config();
console.log("JWT_SECRET:", process.env.JWT_SECRET);
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');





// Middleware
 app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(helmet());
app.use(passport.initialize());
app.use(express.static('public'));

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
  
   const uploadRoutes = require('./Routers/auth');
   app.use('/upload', uploadRoutes);

