const mongoose = require('mongoose');
const Joi = require('joi');

const AuthorSchema = mongoose.Schema({
    firstName: {
        type: String,
        require: true,
        trim: true,
        minlenght: 3,
        maxlight: 30,
    },
    lastName: {
        type: String,
        require: true,
        trim: true,
        minlenght: 3,
        maxlight: 30,
    },
    nationality: {
        type: String,
        require: true,
        trim: true,
        minlenght: 3,
        maxlight: 30,
    },
    age: {
        type: Number,
        require: true,
        trim: true,
        minlenght: 16,
        maxlight: 99,
    },
    image: {
        type: String,
        trim: true,
        default: "default-image.png",
    }
}, {
    timestamps: true
})

const Author = mongoose.model('Author', AuthorSchema)


function validationCreateAuthor(obj) {
    const schema = Joi.object({
        firstName: Joi.string().trim().min(3).max(30).required(),
        lastName: Joi.string().trim().min(3).max(30).required(),
        nationality: Joi.string().trim().min(3).max(300),
        age: Joi.number().min(16).max(99).required(),
        image: Joi.string(),
    })
    return schema.validate(obj)
}

function validationUpdateAuthor(obj) {
    const schema = Joi.object({
        firstName: Joi.string().trim().min(3).max(30),
        lastName: Joi.string().trim().min(3).max(30),
        nationality: Joi.string().trim().min(3).max(300),
        age: Joi.number().min(16).max(99),
        image: Joi.string(),
    })
    return schema.validate(obj)
}


module.exports = {
    Author,
    validationCreateAuthor,
    validationUpdateAuthor
}
