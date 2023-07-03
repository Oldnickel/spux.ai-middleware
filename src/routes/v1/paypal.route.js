const express = require('express');
const validate = require('../../middlewares/validate');
const paypalValidation = require('../../validations/paypal.validation');
const paypalController = require('../../controllers/paypal.controller');

const router = express.Router();

//router.post('/update', validate(planValidation.update), planController.updateWebsite);
router.post('/access_token', validate(paypalValidation.access_token), paypalController.getPayPalAccessToken);
router.post('/subscribe', validate(paypalValidation.subscribe), paypalController.createSubscription);
router.post('/plans', validate(paypalValidation.plans), paypalController.getPlans);

module.exports = router;