const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const visitorSchema = mongoose.Schema(
    {
        visitorID: {
            type: String,
            required: true
        },
        visits: {
            type: Number,
            default: 1,
        },
        timestamp: {
            type: String,
            default: 'not set'
        },
        pageUrl: {
            type: String,
            default: 'not set'
        }
    },
    {
        timestamps: true,
    }
);

// add plugin that converts mongoose to json
visitorSchema.plugin(toJSON);
visitorSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
visitorSchema.statics.isIDtaken = async function (visitorID) {
    const visitor = await this.findOne({ visitorID });
    return !!visitor;
};

/**
 * @typedef User
 */
const Visitor = mongoose.model('Visitor', visitorSchema);

module.exports = Visitor;
