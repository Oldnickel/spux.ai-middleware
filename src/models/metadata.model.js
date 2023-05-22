const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const metadataSchema = mongoose.Schema(
    {
        platform: {
            type: String,
            required: false,
            default: 'unknown'
        },
        isMobile: {
            type: Boolean,
            default: false,
        },
        os: {
            type: String,
            default: false,
        },
        browser: {
            type: String,
            default: 'unknown',
        }
    },
    {
        timestamps: true,
    }
);

// add plugin that converts mongoose to json
metadataSchema.plugin(toJSON);
metadataSchema.plugin(paginate);

/**
 * @typedef User
 */
const MetaData = mongoose.model('MetaData', metadataSchema);

module.exports = MetaData;
