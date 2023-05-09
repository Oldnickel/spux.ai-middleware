const httpStatus = require('http-status');
const { Email } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createEmail = async (emailBody) => {
    if (await Email.isEmailTaken(emailBody.email)) {
        const existingEmail = await getEmailByAddress(emailBody.email);
        console.log('existingEmail: ', existingEmail);
        existingEmail.occurrence = existingEmail.occurrence + 1;
        return updateEmail(emailBody.email, existingEmail);
    }
    return Email.create(emailBody);
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
const queryEmails = async (filter, options) => {
    const visitors = await Email.paginate(filter, options);
    return visitors;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getEmailByAddress = async (email) => {
    //console.log('visitorID: ', visitorID);
    return Email.findOne({ email });
};

const getEmails = async () => {
    return Email.findMany({});
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
const updateEmail = async (email, updateBody) => {
    const emailObject = await getEmailByAddress(email);
    if (!emailObject) {
        return false;
    }
    Object.assign(emailObject, updateBody);
    await emailObject.save();
    return emailObject;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
/* const deleteVisitorById = async (visitorID) => {
    const visitor = await getVisitorById(visitorID);
    if (!visitor) {
        return false;
    }
    await visitor.remove();
    return visitor;
}; */

module.exports = {
    createEmail,
    getEmails,
    queryEmails,
    getEmailByAddress,
    updateEmail,
};
