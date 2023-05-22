const Joi = require('joi');

const create = {
    body: Joi.object().keys({
        os: Joi.string().required(),
        browser: Joi.string().required(),
        isMobile: Joi.boolean().required(),
        platform: Joi.string().required()
    }),
};

const search = {
    body: Joi.object().keys({
        verification: Joi.string().required()
    }),
};


module.exports = { create, search };