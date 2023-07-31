const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { captureService } = require('../services');

const captureEvent = catchAsync(async (req, res) => {
    const capture = await captureService.captureEvent(req.body);
    res.status(httpStatus.CREATED).send(capture);
});

module.exports = {
    captureEvent,
};
