const httpStatus = require('http-status');
const { Plan } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createPlan = async (planBody) => {
    return Plan.create(planBody);
};

const getPlanById = async (planID) => {
    console.log('planID: ', planID);
    return Plan.findById(planID);
};

const getPlanByName = async (planName) => {

    console.log('planName: ', planName);
    return Plan.findOne({ plan: planName });
};


const queryPlans = async (filter, options) => {
    const plans = await Plan.paginate(filter, options);
    return plans;
};

const getAllPlans = async () => {
    //console.log('visitorID: ', visitorID);
    return Plan.find({});
};

const updatePlanById = async (planID, updateBody) => {
    const plan = await getPlanById(planID);
    if (!plan) {
        return false;
    }
    Object.assign(plan, updateBody);
    await plan.save();
    return plan;
};

const deletePlanById = async (planID) => {
    const plan = await getPlanById(planID);
    if (!plan) {
        return false;
    }
    await plan.remove();
    return plan;
};

module.exports = {
    createPlan,
    queryPlans,
    getPlanById,
    updatePlanById,
    deletePlanById,
    getAllPlans,
    getPlanByName
};
