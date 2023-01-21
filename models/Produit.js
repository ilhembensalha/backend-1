const mongoose = require('mongoose');

const produitSchema = new mongoose.Schema({
  code: {type: String, required: true},
  prix: {type: String, required: true},
  description: {type: String, required: true},
  stock: {type: String, required: true},
  notes: {type: String, required: true},
  avis: {type: String, required: true},
  fonctionnalités: {type: String, required: true},
  image: {type: String, default: "produit.JPG"}
 
});

module.exports = mongoose.model('Produit', produitSchema);