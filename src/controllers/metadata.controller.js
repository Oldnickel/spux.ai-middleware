const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { metadataService } = require('../services');

const createMetaData = catchAsync(async (req, res) => {
    const metadata = await metadataService.createMetadata(req.body);
    res.status(httpStatus.CREATED).send(metadata);
});

const getMetadata = catchAsync(async (req, res) => {
    //console.log('get metadata', req.body);
    const metadata = await metadataService.getMetadata();
    res.send(metadata);
});

module.exports = {
    createMetaData,
    getMetadata
};
