const express = require('express')
const { User, validationRegisterUser, validationLoginUser } = require('../Models/User')
const router = express.Router()
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')


/** 
 * @desc Register new user
 * @route /auth/register
 * @method POST 
 * @access public
 */

router.post('/register', asyncHandler(async (req, res) => {
    const { error } = validationRegisterUser(req.body);
    if (error) {
        return res.status(400).json({ message: error.message });
    }

    const user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).json({ message: 'The user is already registered' });
    }

    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    const newUser = new User(req.body);
    const result = await newUser.save();

    const token = jwt.sign({ id: result._id, isAdmin: result.isAdmin }, process.env.JWT_SECRET_KEY); // Changed `user._id` to `result._id`
    const { password, ...other } = result._doc;

    res.status(201).json({ ...other, token });
}));




/** 
 * @desc Login user
 * @route /auth/login
 * @method POST 
 * @access public
 */

router.post('/login', asyncHandler(
    async (req, res) => {
        const { error } = validationLoginUser(req.body)
        if (error) {
            res.status(400).json({ message: error.message })
        }

        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            res.status(400).json({ message: 'Invalid email or password' })
        }

        const isPasswordMatch = await bcrypt.compare(req.body.password, user.password)
        if (!isPasswordMatch) {
            res.status(400).json({ message: 'Invalid email or password' })
        }

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET_KEY)
        const { password, ...other } = user._doc;

        res.status(201).json({ ...other, token })
    }
))

module.exports = router
