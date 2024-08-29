const { User, validationUpdateUser } = require('../Models/User');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');



/** 
 * @desc get all user
 * @route /users
 * @method GET 
 * @access private
 */

const getAllUsers = asyncHandler(
    async (req, res) => {
        const allUsers = await User.find().sort({ title: 1 }).select('-password -isAdmin')
        res.status(200).json(allUsers)
    }
)



/** 
 * @desc Update user
 * @route /users/:id
 * @method PUT 
 * @access private
 */

const updateUser = asyncHandler(async (req, res) => {
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
})




/** 
 * @desc delete user
 * @route /users/:id
 * @method DELETE 
 * @access private
 */

const deleteUser = asyncHandler(
    async (req, res) => {
        const ID = req.params.id
        const user = await User.findById(ID)
        if (user) {
            await User.findByIdAndDelete(user)
            return res.status(200).json({ message: "Deleted successfull" });
        } else {
            return res.status(404).json({ message: error.message });

        }
    }
)



module.exports = {
    getAllUsers,
    updateUser,
    deleteUser
}