const Joi = require('joi');

/* const update = {
    body: Joi.object().keys({
        planID: Joi.string().required(),
        traffic: Joi.number(),
        status: Joi.string(),
    }),
}; */

/* const create = {
    body: Joi.object().keys({
        plan: Joi.string().required(),
        trafficLimit: Joi.number().required(),
        interactionsLimit: Joi.number().required(),
        websiteLimit: Joi.number().required(),
        followUpLimit: Joi.number().required(),
        price: Joi.number().required(),
        description: Joi.string(),
    }),
}; */

const access_token = {
    body: Joi.object().keys({
        validation: Joi.string(),
    }),
};

const plans = {
    body: Joi.object().keys({
        validation: Joi.string(),
    }),
};

const subscribe = {
    body: Joi.object().keys({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().required(),
        plan_id: Joi.string().required(),
    }),
};




module.exports = { access_token, subscribe, plans };