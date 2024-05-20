const router = require('express').Router()
const { signup,
    login,
    sendResetPasswordCode,
    resetPasswordWithCode,
    authentication
} = require('../controllers/authController')

router.route('/signup').post(signup)
router.route('/login').post(login)
router.route('/resetCode').post(sendResetPasswordCode)
router.route('/resetPassword').post(resetPasswordWithCode)

router.use(authentication)

module.exports = router