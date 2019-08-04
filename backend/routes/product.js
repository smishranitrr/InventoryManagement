var express = require('express');
var router = express.Router();
var productController = require('../controllers/product');


router.post('/create', productController.createProduct);

router.get('/getAll', productController.getAllProducts);

router.get('/:id', productController.getProduct);

router.put('/:id/update', productController.updateProduct);

router.delete('/:id/delete', productController.deleteProduct);


module.exports = router;