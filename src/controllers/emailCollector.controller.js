const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { emailCollectorService } = require('../services');

const createEmail = catchAsync(async (req, res) => {
    const email = await emailCollectorService.createEmail(req.body);
    res.status(httpStatus.CREATED).send(email);
});

const getEmails = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['name', 'role']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await emailCollectorService.queryEmails(filter, options);
    res.send(result);
});

const getEmail = catchAsync(async (req, res) => {
    console.log('get email', req.body);
    const email = await emailCollectorService.getEmailByAddress(req.body.email);
    if (!email) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Email not found');
    }
    res.send(email);
});

/* const updateVisitor = catchAsync(async (req, res) => {
    const visitor = await visitorService.updateVisitorById(req.body.visitorID, req.body);
    res.send(visitor);
}); */

/* const deleteVisitor = catchAsync(async (req, res) => {
    await visitorService.deleteVisitorById(req.params.visitorId);
    res.status(httpStatus.NO_CONTENT).send();
}); */

module.exports = {
    createEmail,
    getEmail,
    getEmails,
};
