const Joi = require('joi');

const captureEvent = {
    body: Joi.object().keys({
        validation: Joi.string(),
        data: Joi.object(),
        event: Joi.string()
    }),
};

module.exports = { captureEvent };