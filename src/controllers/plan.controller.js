const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { planService } = require('../services');

const createPlan = catchAsync(async (req, res) => {
    const plan = await planService.createPlan(req.body);
    res.status(httpStatus.CREATED).send(plan);
});

const queryPlans = catchAsync(async (req, res) => {
    const filter = pick(req.body, ['plan', 'id']);
    const options = pick(req.body, ['sortBy', 'limit', 'page']);
    const result = await planService.queryPlans(filter, options);
    res.send(result);
});

const getPlan = catchAsync(async (req, res) => {
    console.log('get plan', req.body);
    const plan = await planService.getPlanById(req.body.planID);
    if (!plan) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Plan not found');
    }
    res.send(plan);
});

const getAllPlans = catchAsync(async (req, res) => {
    //console.log('get plan', req.body);
    const plans = await planService.getAllPlans();
    res.send(plans);
});

const getPlansByID = catchAsync(async (req, res) => {
    //console.log('get plan', req.body);
    const plan = await planService.getPlanById(req.body.id);
    console.log('plan: ', plan);
    res.send(plan);
});

const getPlansByName = catchAsync(async (req, res) => {
    //console.log('get plan', req.body);
    const plan = await planService.getPlanByName(req.body.planName);
    console.log('plan: ', plan);
    res.send(plan);
});

const updatePlan = catchAsync(async (req, res) => {
    const plan = await planService.updatePlanById(req.body.planID, req.body);
    res.send(plan);
});

const deletePlan = catchAsync(async (req, res) => {
    await planService.deletePlanById(req.params.planId);
    res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
    createPlan,
    queryPlans,
    getPlan,
    updatePlan,
    deletePlan,
    getAllPlans,
    getPlansByID,
    getPlansByName
};
