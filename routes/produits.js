const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const post_route = express();

/*const multer = require('multer');
const path = require('path');*/

post_route.use(express.static('public'));

/*const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'../public/postImages'),function(error,success){
            if(error){
                console.log(error);
            }
        });
    },
    filename:function(req,file,cb){
        const name = Date.now()+'-'+file.originalname;
        cb(null,name,function(error,success){
            if(error){
                console.log(error);
            }
        });
    }
});
const upload =  multer({storage:storage});*/


const produitController = require('../controllers/produit')
const auth = require('./../middlewares/auth')

router.get('/',auth,produitController.all);
router.get('/:id',auth, produitController.get);
/*router.post('/',upload.single('image'),produitController.create);*/
router.post('/',produitController.create);
router.put('/:id', auth, produitController.update);
router.delete('/:id', auth, produitController.delete);

module.exports = router;