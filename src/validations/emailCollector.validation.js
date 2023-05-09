const Joi = require('joi');

const create = {
    body: Joi.object().keys({
        email: Joi.string().required(),
        field: Joi.string().required(),
    }),
};

const search = {
    body: Joi.object().keys({
        email: Joi.string().required()
    }),
};

const getEmails = {
    body: Joi.object().keys({
        auth: Joi.string().required().valid('cnyamao')
    }),
};


module.exports = { create, search, getEmails };