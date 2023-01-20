const Produit = require('../models/Produit');

// get all produits
exports.all = (req, res) => {
  Produit.find()
    .then(produits => res.status(200).json(produits))
    .catch(err => res.status(400).json({error: err.message}));
};

// get a produit by id
exports.get = (req, res, next) => {
  Produit.findOne({ _id: req.params.id })
      .then(produit => res.status(200).json(produit))
      .catch(error => res.status(404).json({ error }));
  };

  // store a new produit
exports.create = (req, res, next) => {
  const produit = new Produit({
    ...req.body
  });
  produit.save()
    .then(() => res.status(201).json({ message: 'Produit created  !'}))
    .catch(error => res.status(400).json({ error }));
};

// update a produit by id
exports.update = (req, res, next) => {
  Produit.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Produit updated !'}))
    .catch(error => res.status(400).json({ error }));
};

// delete a produit by id
exports.delete = (req, res, next) => {
  Produit.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Produit deleted !'}))
    .catch(error => res.status(400).json({ error }));
};