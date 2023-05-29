const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { websiteService } = require('../services');

const createWebsite = catchAsync(async (req, res) => {
    const website = await websiteService.createWebsite(req.body);
    res.status(httpStatus.CREATED).send(website);
});

const queryWebsites = catchAsync(async (req, res) => {
    const filter = pick(req.body, ['url', 'userID']);
    const options = pick(req.body, ['sortBy', 'limit', 'page']);
    const result = await websiteService.queryWebsites(filter, options);
    res.send(result);
});

const getWebsite = catchAsync(async (req, res) => {
    console.log('get website', req.body);
    const website = await websiteService.getWebsiteById(req.body.websiteID);
    if (!website) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Website not found');
    }
    res.send(website);
});

const getAllWebsites = catchAsync(async (req, res) => {
    //console.log('get website', req.body);
    const websites = await websiteService.getAllWebsites();
    res.send(websites);
});

const updateWebsite = catchAsync(async (req, res) => {
    const website = await websiteService.updateWebsiteById(req.body.websiteID, req.body);
    res.send(website);
});

const deleteWebsite = catchAsync(async (req, res) => {
    await websiteService.deleteWebsiteById(req.params.websiteId);
    res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
    createWebsite,
    queryWebsites,
    getWebsite,
    updateWebsite,
    deleteWebsite,
    getAllWebsites
};
