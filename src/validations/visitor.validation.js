const Joi = require('joi');

const update = {
    body: Joi.object().keys({
        visitorID: Joi.string().required(),
        visits: Joi.number().required(),
    }),
};

const create = {
    body: Joi.object().keys({
        visitorID: Joi.string().required()
    }),
};

const search = {
    body: Joi.object().keys({
        visitorID: Joi.string().required()
    }),
};


module.exports = { create, update, search };