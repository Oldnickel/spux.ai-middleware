const Joi = require('joi');

/* const update = {
    body: Joi.object().keys({
        planID: Joi.string().required(),
        traffic: Joi.number(),
        status: Joi.string(),
    }),
}; */

const create = {
    body: Joi.object().keys({
        plan: Joi.string().required(),
        trafficLimit: Joi.number().required(),
        interactionsLimit: Joi.number().required(),
        websiteLimit: Joi.number().required(),
        followUpLimit: Joi.number().required(),
        price: Joi.number().required(),
        description: Joi.string(),
    }),
};

const search = {
    body: Joi.object().keys({
        planID: Joi.string()
    }),
};

const getAllPlans = {
    body: Joi.object().keys({
        verification: Joi.string().required()
    }),
};

const getPlanByID = {
    body: Joi.object().keys({
        id: Joi.string().required()
    }),
};

const queryPlans = {
    query: Joi.object().keys({
        plan: Joi.string(),
        planID: Joi.string(),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    }),
};




module.exports = { create, search, getAllPlans, queryPlans, getPlanByID };