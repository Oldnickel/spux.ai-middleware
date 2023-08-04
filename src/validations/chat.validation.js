const Joi = require('joi');

const findProducts = {
    body: Joi.object(),
};

const saveProduct = Joi.object();

module.exports = { findProducts, saveProduct };