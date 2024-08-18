const Joi = require('joi');


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


module.exports = validationUpdateBook
