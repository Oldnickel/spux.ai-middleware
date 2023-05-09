const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');

const emailSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true
        },
        occurrence: {
            type: Number,
            default: 1,
        },
        field: {
            type: String,
        }
    },
    {
        timestamps: true,
    }
);

// add plugin that converts mongoose to json
emailSchema.plugin(toJSON);
emailSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
emailSchema.statics.isEmailTaken = async function (email) {
    const emailObject = await this.findOne({ email });
    return !!emailObject;
};

/**
 * @typedef User
 */
const Email = mongoose.model('Email', emailSchema);

module.exports = Email;
