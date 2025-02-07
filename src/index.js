
// Main file that starts the server

const express = require('express');
const cors = require('cors');
const cookoieParser = require('cookie-parser');
const helmet = require('helmet');
const mongoose = require('mongoose');
 require("dotenv").config();



const app = express();
app.use(cors());
app.use(express.json());
app.use(cookoieParser());
app.use(helmet());




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
  



app.get('/', (req, res) => {
  res.json("Welcome to the API");
});












   const users = require('./Routers/users');
   app.use('/users', users);

   const authRoutes = require('./Routers/auth');
   app.use('/auth', authRoutes);
  
   const uplaodRoutes = require('./Routers/auth');
   app.use('/uplaod', uplaodRoutes);


