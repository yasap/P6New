
const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauces')
const path = require('path');
const app = express();
const cors = require('cors');


mongoose.connect("mongodb+srv://Piriya:Testuno@cluster0.v0k8d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
  .then(() => {
    console.log('successfully connected to Mongodb Atlas')
  })
  
  .catch((error) => {
    console.log('Error on connecting to Mongodb Atlas');
    console.error(error);
  })
app.use(cors());
app.options("*", cors());


app.use('/images', express.static(path.join(__dirname, 'images')));
  app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
  

app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);
module.exports = app;

