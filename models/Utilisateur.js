const mongoose = require('mongoose');

const utilisateurSchema = new mongoose.Schema({
  email: {type: String, required: true,  unique: true },
  username: {type: String, required: true},
  password: {type: String, required: true},
  role: {type: String, default: "user"}
});


module.exports = mongoose.model('Utilisateur', utilisateurSchema);
