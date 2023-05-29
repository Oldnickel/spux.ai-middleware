const httpStatus = require('http-status');
const { Website } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createWebsite = async (websiteBody) => {
    return Website.create(websiteBody);
};

const getWebsiteById = async (websiteID) => {
    console.log('websiteID: ', websiteID);
    return Visitor.findOne({ websiteID });
};


const queryWebsites = async (filter, options) => {
    const websites = await Website.paginate(filter, options);
    return websites;
};

const getAllWebsites = async () => {
    //console.log('visitorID: ', visitorID);
    return Website.find({});
};

const updateWebsiteById = async (websiteID, updateBody) => {
    const website = await getWebsiteById(websiteID);
    if (!website) {
        return false;
    }
    Object.assign(website, updateBody);
    await website.save();
    return website;
};

const deleteWebsiteById = async (websiteID) => {
    const website = await getWebsiteById(websiteID);
    if (!website) {
        return false;
    }
    await website.remove();
    return website;
};

module.exports = {
    createWebsite,
    queryWebsites,
    getWebsiteById,
    updateWebsiteById,
    deleteWebsiteById,
    getAllWebsites
};
