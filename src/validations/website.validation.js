const Joi = require('joi');

const update = {
    body: Joi.object().keys({
        websiteID: Joi.string().required(),
        traffic: Joi.number(),
        status: Joi.string(),
    }),
};

const create = {
    body: Joi.object().keys({
        url: Joi.string().required(),
        userID: Joi.string().required(),
        traffic: Joi.number(),
        status: Joi.string(),
        favicon: Joi.string(),
        sales: Joi.number(),
    }),
};

const search = {
    body: Joi.object().keys({
        userID: Joi.string()
    }),
};

const getAllWebsites = {
    body: Joi.object().keys({
        verification: Joi.string().required()
    }),
};

const queryWebsites = {
    query: Joi.object().keys({
        url: Joi.string(),
        userID: Joi.string(),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    }),
};




module.exports = { create, update, search, getAllWebsites, queryWebsites };