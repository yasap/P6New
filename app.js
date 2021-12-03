
const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauces')
const path = require('path');
const app = express();



// const User = require("./models/user.js");
// const bcrypt = require("bcrypt");
mongoose.connect("mongodb+srv://Piriya:Testuno@cluster0.v0k8d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
  .then(() => {
    console.log('successfully connected to Mongodb Atlas')
  })
  
  .catch((error) => {
    console.log('Error on connecting to Mongodb Atlas');
    console.error(error);
  })
 
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Method", "PUT, GET, DELETE, POST")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Origin, Accept, authorization, Content, X-Requested-With")
  next()
})

app.use('/images', express.static(path.join(__dirname, 'images')));
  app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
  

app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);
module.exports = app;

//  login , findone , sauses , mongose 