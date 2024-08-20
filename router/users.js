const express = require('express');
const { User, validationUpdateUser } = require('../Models/User');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const { verifyToken } = require('../middlewares/verifyToken');

/** 
 * @desc Update user
 * @route /users/update/:id
 * @method PUT 
 * @access Private
 */
router.put('/update/:id', verifyToken, asyncHandler(async (req, res) => {

    if (req.user.id !== req.params.id) { // Use `req.user.id` instead of `req.user._id`
        return res.status(401).json({ message: 'You are not allowed to update this profile' });
    }

    const { error } = validationUpdateUser(req.body);
    if (error) {
        return res.status(400).json({ message: error.message });
    }

    if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    const userUpdate = await User.findByIdAndUpdate(req.params.id, {
        $set: {
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password,
        }
    }, {
        new: true,
    }).select('-password');

    res.status(200).json(userUpdate);
}));

module.exports = router;
