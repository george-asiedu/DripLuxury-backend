const router = require('express').Router()
const { googleConsent, handleCallback } = require('../controllers/oauthController')

router.route('/google').get(googleConsent)
router.route('/').get(handleCallback)

module.exports = router