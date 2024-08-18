const Joi = require('joi');


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


module.exports = validationCreateBook
