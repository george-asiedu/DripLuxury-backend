const router = require("express").Router()
const { authentication, restrictTo } = require('../controllers/authController')
const { createSingleProduct ,createManyProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require('../controllers/productController')

router.route('/create-many').post(authentication, createManyProduct)
router.route('/create-single').post(authentication, createSingleProduct)
router.route('/products').get(getAllProducts)
router.route('/:id').get(authentication, getProductById)
router.route('/:id').patch(authentication, updateProduct)
router.route('/:id').delete(authentication, deleteProduct)

module.exports = router