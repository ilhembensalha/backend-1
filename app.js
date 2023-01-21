require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser')


const produitRouter = require('./routes/produits');
//const userRouter = require('./routes/users');
const utilisateurRouter = require('./routes/utilisateurs');
const app = express();
app.use(express.json());
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended:true}));
app.use(bodyParser.json());
app.use(express.static('public'));
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://0.0.0.0:27017/ecom',
  { useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true 
  })
  .then(() => console.log('Connected successfully to MongoDB !'))
  .catch(() => console.log('Connection failed to MongoDB !'));



  app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


app.use('/api/produit',produitRouter);
app.use('/api/utilisateur',utilisateurRouter);

module.exports = app;