const mongoose = require('mongoose');
const Joi = require('joi');

const BookSchema = mongoose.Schema({
    title: {
        type: String,
        require: true,
        trim: true,
        minlenght: 3,
        maxlight: 30,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "Author"
    },
    description: {
        type: String,
        trim: true,
        minlenght: 3,
        maxlight: 300,
    },
    price: {
        type: Number,
        require: true,
        minlenght: 0,
    },
    cover: {
        type: String,
        require: true,
        enum: ["soft cover", "hard cover"],
    }
}, {
    timestamps: true
})

const Book = mongoose.model('Book', BookSchema)


function validationCreateBook(obj) {
    const schema = Joi.object({
        title: Joi.string().trim().min(3).max(250).required(),
        author: Joi.string().required(),
        description: Joi.string().trim().min(5).max(500),
        price: Joi.number().min(0).required(),
        cover: Joi.string().valid("soft cover", "hard cover").required(),
    })
    return schema.validate(obj)
}

function validationUpdateBook(obj) {
    const schema = Joi.object({
        title: Joi.string().trim().min(3).max(250),
        author: Joi.string(),
        description: Joi.string().trim().min(5).max(500),
        price: Joi.number().min(0),
        cover: Joi.string().valid("soft cover", "hard cover"),
    })
    return schema.validate(obj)
}

module.exports = {
    Book,
    validationCreateBook,
    validationUpdateBook
}
