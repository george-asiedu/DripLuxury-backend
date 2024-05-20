const router = require("express").Router()
const { authentication, restrictTo } = require('../controllers/authController')
const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require('../controllers/productController')

router.route('/create').post(authentication, createProduct)
router.route('/allProducts').get(getAllProducts)
router.route('/:id').get(authentication, getProductById)
router.route('/:id').patch(authentication, updateProduct)
router.route('/:id').delete(authentication, deleteProduct)

module.exports = router