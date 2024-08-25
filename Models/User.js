const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken')


const UserSchema = mongoose.Schema({
    userName: {
        type: String,
        require: true,
        trim: true,
        minlenght: 3,
        maxlight: 100,
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique:true,
        minlenght: 3,
        maxlight: 100,
    },
    password: {
        type: String,
        require: true,
        trim: true,
        minlenght: 8,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true
})
// Create token
UserSchema.methods.generateToken = function () {
    return jwt.sign({ id: this._id, isAdmin: this.isAdmin }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
}

const User = mongoose.model('User', UserSchema)


// Validation Register User
function validationRegisterUser(obj) {
    const schema = Joi.object({
        userName: Joi.string().trim().min(3).max(100).required(),
        email: Joi.string().trim().min(3).max(100).required(),
        password: Joi.string().trim().min(8).required(),
        // isAdmin: Joi.bool(),
    })
    return schema.validate(obj)
}

// Validation Login User
function validationLoginUser(obj) {
    const schema = Joi.object({
        email: Joi.string().trim().min(3).max(100).required(),
        password: Joi.string().trim().min(8).required(),
    })
    return schema.validate(obj)
}

// Validation Update User
function validationUpdateUser(obj) {
    const schema = Joi.object({
        userName: Joi.string().trim().min(3).max(100),
        email: Joi.string().trim().min(3).max(100),
        password: Joi.string().trim().min(8),
        // isAdmin: Joi.bool(),
    })
    return schema.validate(obj)
}

module.exports = {
    User,
    validationRegisterUser,
    validationLoginUser,
    validationUpdateUser
}
