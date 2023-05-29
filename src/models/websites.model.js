const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const websiteSchema = mongoose.Schema(
    {
        url: {
            type: String,
            required: true,
            trim: true,
        },
        traffic: {
            type: Number,
            default: 0,
        },
        sales: {
            type: Number,
            default: 0,
        },
        status: {
            type: String,
            enum: ['active', 'inactive'],
            default: 'active' // Optional, sets the default value to 'active'
        },
        favicon: {
            type: String,
        },
        userID: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

// add plugin that converts mongoose to json
websiteSchema.plugin(toJSON);
websiteSchema.plugin(paginate);

/**
 * @typedef User
 */
const Website = mongoose.model('Website', websiteSchema);

module.exports = Website;
