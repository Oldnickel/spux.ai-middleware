const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { visitorService } = require('../services');

const createVisitor = catchAsync(async (req, res) => {
    const visitor = await visitorService.createVisitor(req.body);
    res.status(httpStatus.CREATED).send(visitor);
});

const getVisitors = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['name', 'role']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await visitorService.queryVisitors(filter, options);
    res.send(result);
});

const getVisitor = catchAsync(async (req, res) => {
    console.log('get visitor', req.body);
    const visitor = await visitorService.getVisitorById(req.body.visitorID);
    if (!visitor) {
        res.send('visitor not found')
        //throw new ApiError(httpStatus.NOT_FOUND, 'Visitor not found');
    } else {
        res.send(visitor);
    }
});

const getAllVisitors = catchAsync(async (req, res) => {
    //console.log('get visitor', req.body);
    const visitors = await visitorService.getAllVisitors();
    res.send(visitors);
});

const updateVisitor = catchAsync(async (req, res) => {
    const visitor = await visitorService.updateVisitorById(req.body.visitorID, req.body);
    res.send(visitor);
});

const deleteVisitor = catchAsync(async (req, res) => {
    await visitorService.deleteVisitorById(req.params.visitorId);
    res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
    createVisitor,
    getVisitors,
    getVisitor,
    updateVisitor,
    deleteVisitor,
    getAllVisitors
};
