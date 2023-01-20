const express = require('express');
const router = express.Router();

const produitController = require('../controllers/produit')
const auth = require('./../middlewares/auth')

router.get('/', auth,produitController.all);
router.get('/:id',auth, produitController.get);
router.post('/',  auth,produitController.create);
router.put('/:id', auth, produitController.update);
router.delete('/:id', auth, produitController.delete);

module.exports = router;