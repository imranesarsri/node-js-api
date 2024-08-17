const Joi = require('joi');


function validationCreateBook(obj) {
    const schema = Joi.object({
        title: Joi.string().trim().min(3).max(30).required(),
        author: Joi.string().trim().min(3).max(30).required(),
        description: Joi.string().trim().min(3).max(300),
        price: Joi.number().min(0).required(),
        cover: Joi.string().trim().min(3).max(30).required(),
    })
    return schema.validate(obj)
}


module.exports = validationCreateBook
