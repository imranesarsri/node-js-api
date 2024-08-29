const express = require('express')
const router = express.Router()
const { getForgotPasswordView, sendForgetPasswordLink } = require('../controllers/forgotPasswordController')

router.route('/forgot-password').get(getForgotPasswordView).post(sendForgetPasswordLink)

module.exports = router