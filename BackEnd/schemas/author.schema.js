const Joi = require('joi');

authorId = Joi.string().required();
name = Joi.string().required();
state = Joi.boolean().required();
createdAt = Joi.date().required();
updatedAt = Joi.date().required();

const authorSchema = Joi.object({
    authorId: Joi.string(),
    name: Joi.string(),
    state: Joi.boolean(),
    createdAt: Joi.date(),
    updatedAt: Joi.date(),
});

const createAuthorSchema = Joi.object({
    name: Joi.string().required(),
    state: Joi.boolean().required(),
    createdAt: Joi.date(),
    updatedAt: Joi.date(),
    authorId: Joi.string()
})

module.exports = {
    authorSchema,
    createAuthorSchema
}