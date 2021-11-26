const express = require('express');
const router = express.Router()
const products = require('../controllers/productControllers');
const uploadPhotoProduct = require('../middlewares/uploadPhotoProduct');

router.post('/create-product', uploadPhotoProduct, products.createProduct);

module.exports = router;