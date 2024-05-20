const router = require('express').Router();
const { authentication, restrictTo } = require('../controllers/authController')
const { getAllUser } = require('../controllers/adminController')

router.route('/getAllUsers').get(authentication, restrictTo('Super Admin'), getAllUser)

module.exports = router