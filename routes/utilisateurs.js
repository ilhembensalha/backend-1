const express = require('express');
const router = express.Router();

const utilisateurController = require('../controllers/utilisateur')
const auth = require('./../middlewares/auth')

router.get('/',auth,  utilisateurController.all);
router.get('/:id',auth,  utilisateurController.get);
router.post('/', auth, utilisateurController.create);
router.put('/:id',auth,  utilisateurController.update);
router.delete('/:id',auth,  utilisateurController.delete);
router.post('/signup', utilisateurController.signup);
router.post('/signOut',auth, utilisateurController.signOut);
router.post('/login', utilisateurController.login);
router.get('/profile/:id',auth, utilisateurController.profile);


module.exports = router;