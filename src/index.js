
// Main file that starts the server

const express = require('express');
const cors = require('cors');
require('dotenv').config();


const port = process.env.PORT || 5000;
const app = express();


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json('message: Welcome to the API');
});


   const users = require('./Routers/users');
   app.use('/users', users);

   const authRoutes = require('./Routers/auth');
   app.use('/auth', authRoutes);
  
   const uplaodRoutes = require('./Routers/auth');
   app.use('/uplaod', uplaodRoutes);


// Launch server
app.listen(port, () => {
    console.log(`Server is online!`);
  });
