const httpStatus = require('http-status');
const { Visitor } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createVisitor = async (visitorBody) => {
    if (await Visitor.isIDtaken(visitorBody.visitorID)) {
        return false;
    }
    return Visitor.create(visitorBody);
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryVisitors = async (filter, options) => {
    const visitors = await Visitor.paginate(filter, options);
    return visitors;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getVisitorById = async (visitorID) => {
    console.log('visitorID: ', visitorID);
    return Visitor.findOne({ visitorID });
};

const getAllVisitors = async () => {
    //console.log('visitorID: ', visitorID);
    return Visitor.find({});
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateVisitorById = async (visitorID, updateBody) => {
    const visitor = await getVisitorById(visitorID);
    if (!visitor) {
        return false;
    }
    Object.assign(visitor, updateBody);
    await visitor.save();
    return visitor;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteVisitorById = async (visitorID) => {
    const visitor = await getVisitorById(visitorID);
    if (!visitor) {
        return false;
    }
    await visitor.remove();
    return visitor;
};

module.exports = {
    createVisitor,
    queryVisitors,
    getVisitorById,
    updateVisitorById,
    deleteVisitorById,
    getAllVisitors
};
