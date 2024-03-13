const Joi = require('joi');

genreId = Joi.number().required();
name = Joi.string().required();


const genreSchema = Joi.object({
    genreId: Joi.number(),
    name: Joi.string(),
    
});

const createGenreSchema = Joi.object({
    name: Joi.string().required(),
})

module.exports = {
    genreSchema,
    createGenreSchema
}