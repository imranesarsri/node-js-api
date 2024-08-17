const Joi = require('joi');


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


module.exports = validationUpdateAuthor
