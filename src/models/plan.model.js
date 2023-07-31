const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const planSchema = mongoose.Schema(
    {
        plan: {
            type: String,
            required: true,
        },
        trafficLimit: {
            type: Number,
            default: 0,
            required: true
        },
        websiteLimit: {
            type: Number,
            default: 0,
            required: true
        },
        followUpLimit: {
            type: Number,
            default: 0,
            required: true
        },
        interactionsLimit: {
            type: Number,
            default: 0,
            required: true
        },
        price: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
        }
    },
    {
        timestamps: true,
    }
);

// add plugin that converts mongoose to json
planSchema.plugin(toJSON);
planSchema.plugin(paginate);

/**
 * @typedef User
 */
const Plan = mongoose.model('Plan', planSchema);

module.exports = Plan;
