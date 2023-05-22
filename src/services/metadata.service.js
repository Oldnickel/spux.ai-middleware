const httpStatus = require('http-status');
const { MetaData } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createMetadata = async (metadataBody) => {
    return MetaData.create(metadataBody);
};

const getMetadata = async () => {
    return MetaData.find({});
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */



module.exports = {
    createMetadata,
    getMetadata
};
