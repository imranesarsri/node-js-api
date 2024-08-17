const Joi = require('joi');


function validationCreateAuthor(obj) {
    const schema = Joi.object({
        firstName: Joi.string().trim().min(3).max(30).required(),
        lastName: Joi.string().trim().min(3).max(30).required(),
        nationality: Joi.string().trim().min(3).max(300),
        age: Joi.number().min(16).required(),
        image: Joi.string().trim().min(3).max(300).required(),
    })
    return schema.validate(obj)
}


module.exports = validationCreateAuthor
