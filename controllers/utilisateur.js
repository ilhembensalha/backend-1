const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Utilisateur = require('../models/Utilisateur');
// get all courses
exports.all = (req, res) => {
    Utilisateur.find()
    .then(utilisateurs => res.status(200).json(utilisateurs))
    .catch(err => res.status(400).json({error: err.message}));
};

// get a course by id
exports.get = (req, res, next) => {
    Utilisateur.findOne({ _id: req.params.id })
      .then(utilisateur => res.status(200).json(utilisateur))
      .catch(error => res.status(404).json({ error }));
  };

  // store a new course
exports.create = (req, res, next) => {
  const utilisateur = new Utilisateur({
    ...req.body
  });
  utilisateur.save()
    .then(() => res.status(201).json({ message: 'Utilisateur created  !'}))
    .catch(error => res.status(400).json({ error }));
};

// update a course by id
exports.update = (req, res, next) => {
    Utilisateur.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Utilisateur updated !'}))
    .catch(error => res.status(400).json({ error }));
};

// delete a course by id
exports.delete = (req, res, next) => {
    Utilisateur.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Utilisateur deleted !'}))
    .catch(error => res.status(400).json({ error }));
};

/*
exports.signup = (req, res, next) =>{
  Utilisateur.findOne({email:req.body.email},(err,utilisateur)=>{
          if(utilisateur==null){
            bcrypt.hash(req.body.password, 10)
            .then(hash => {
              const utilisateur = Utilisateur({
                nom: req.body.nom,
                prenom: req.body.prenom,
                adresse: req.body.adresse,
                telephone: req.body.telephone,
                username: req.body.username,
                email: req.body.email,
                password:hash
              })
              utilisateur.save()
              .then((err)=>{
                  if(err){
                      console.log(err)
                      res.json(err)
                  }else{
                      console.log(utilisateur)
                      res.json(utilisateur)
                  }
                  
              })
            })
          }else{

            return res.status(402).json({ message: 'email utilisé !' });  
          }
      
  })
  
};

exports.login=(req,res,next)=>{
  Utilisateur.findOne({email:req.body.email},(err,utilisateur)=>{
      if (utilisateur==null) {
        return res.status(402).json({ message: 'utilisateur not found !' });
      }
      else{
        bcrypt.compare(req.body.password, utilisateur.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Wrong password !' });
          }
          else{res.json(utilisateur) }
            
      })
    }
  })
};*/
//singup

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const utilisateur = new Utilisateur({
        nom: req.body.nom,
        prenom: req.body.prenom,
        adresse: req.body.adresse,
        telephone: req.body.telephone,
        role: req.body.role,
        username: req.body.username,
        email: req.body.email,
        password: hash
      });
              utilisateur.save()
                  .then(() => res.status(201).json({
                    message: 'utilisateur created !',
                    status: 201,
                    userId: utilisateur._id,
                    token: jwt.sign(
                      { userId: utilisateur._id },
                      'RANDOM_TOKEN_SECRET',
                      { expiresIn: '24h' }
                      )
                  }))
                  .catch(error => res.status(400).json({ error }));
          })
          .catch(error => res.status(500).json({ error }));
  };
  
  exports.login = (req, res, next) => {
    Utilisateur.findOne({ email: req.body.email })
        .then(utilisateur => {
          if (!utilisateur) {
            return res.status(401).json({ error: 'User not found !' });
          }
          bcrypt.compare(req.body.password, utilisateur.password)
            .then(valid => {
              if (!valid) {
                return res.status(401).json({ error: 'Wrong password !' });
              }
              res.status(200).json({
                userId: utilisateur._id,
                token: jwt.sign(
                  { userId: utilisateur._id },
                  'RANDOM_TOKEN_SECRET',
                  { expiresIn: '24h' }
                )
              });
            })
            .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
  };


  exports.profile = (req, res, next) => {
    Utilisateur.findOne({ _id: req.params.id })
      .then(utilisateur => res.status(200).json(utilisateur))
      .catch(error => res.status(500).json({ error }));
  };
  exports.signOut = async (req, res) => {
    res.clearCookie('nToken');
  };