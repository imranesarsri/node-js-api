const Joi = require('joi');


function validationUpdateBook(obj) {
    const schema = Joi.object({
        title: Joi.string().trim().min(3).max(30),
        author: Joi.string().trim().min(3).max(30),
        description: Joi.string().trim().min(3).max(300),
        price: Joi.number().min(0),
        cover: Joi.string().trim().min(3).max(30),
    })
    return schema.validate(obj)
}


module.exports = validationUpdateBook
