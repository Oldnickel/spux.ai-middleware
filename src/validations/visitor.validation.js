const Joi = require('joi');

const update = {
    body: Joi.object().keys({
        visitorID: Joi.string().required(),
        timestamp: Joi.string(),
        pageUrl: Joi.string(),
    }),
};

const create = {
    body: Joi.object().keys({
        visitorID: Joi.string().required(),
        timestamp: Joi.string(),
        pageUrl: Joi.string(),
    }),
};

const search = {
    body: Joi.object().keys({
        visitorID: Joi.string().required()
    }),
};

const getAllVisitors = {
    body: Joi.object().keys({
        verification: Joi.string().required()
    }),
};




module.exports = { create, update, search, getAllVisitors };