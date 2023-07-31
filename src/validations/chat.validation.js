const Joi = require('joi');

const findProducts = {
    body: Joi.object().keys({
        queryResult: Joi.object().required(),
    }),
};

const saveProduct = Joi.object();

module.exports = { findProducts, saveProduct };