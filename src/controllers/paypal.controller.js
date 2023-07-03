const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { paypalService } = require('../services');

const getPayPalAccessToken = catchAsync(async (req, res) => {
    /* console.log('get plan', req.body); */
    const accessToken = await paypalService.generateAccessToken();
    if (!accessToken) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Token not found');
    }
    res.send(accessToken);
});

const createSubscription = catchAsync(async (req, res) => {
    /* console.log('get plan', req.body); */
    const subscription = await paypalService.createSubscription(req.body);
    if (!subscription) {
        throw new ApiError(httpStatus.NOT_FOUND, 'plan not found');
    }
    res.send(subscription);
});

const getPlans = catchAsync(async (req, res) => {
    /* console.log('get plan', req.body); */
    const plans = await paypalService.getPlans();
    if (!plans) {
        throw new ApiError(httpStatus.NOT_FOUND, 'no plans found');
    }
    res.send(plans);
});

module.exports = {
    getPayPalAccessToken,
    createSubscription,
    getPlans
};
