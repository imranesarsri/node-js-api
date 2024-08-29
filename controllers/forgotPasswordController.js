const asyncHandler = require('express-async-handler');


/** 
 * @desc get Forgot Password View
 * @route /password/forgot-password
 * @method GET 
 * @access public
 */

module.exports.getForgotPasswordView = asyncHandler((req, res) => {
    res.render('forgotpassword')
})

/** 
 * @desc send forgot password link
 * @route /password/forgot-password
 * @method POST 
 * @access public
 */

module.exports.sendForgetPasswordLink = asyncHandler(async (req, res) => {

})