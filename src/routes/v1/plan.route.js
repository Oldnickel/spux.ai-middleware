const express = require('express');
const validate = require('../../middlewares/validate');
const planValidation = require('../../validations/plan.validation');
const planController = require('../../controllers/plan.controller');

const router = express.Router();

//router.post('/update', validate(planValidation.update), planController.updateWebsite);
router.post('/create', validate(planValidation.create), planController.createPlan);
router.post('/search', validate(planValidation.queryPlans), planController.queryPlans);
router.post('/all', validate(planValidation.getAllPlans), planController.getAllPlans);
router.post('/id', validate(planValidation.getPlanByID), planController.getPlansByID);

module.exports = router;