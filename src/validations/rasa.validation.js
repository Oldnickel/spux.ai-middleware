const Joi = require('joi');

const chat = {
    body: Joi.object().keys({
        sender: Joi.string().required(),
        message: Joi.string().required(),
    }),
};


module.exports = { chat }