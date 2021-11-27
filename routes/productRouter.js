const express = require('express');
const router = express.Router()
const products = require('../controllers/productControllers');
const upload = require('../middlewares/uploadPhotoProduct');

router.post('/', upload('picture'), products.createProduct);
router.get('/',  products.getAllProduct);
router.get('/:id',  products.getProductById);
router.delete('/:id', products.removeProductById);
router.put('/:id', upload('picture'), products.updateProductById);

module.exports = router;
