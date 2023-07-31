const express = require('express');
const validate = require('../../middlewares/validate');
const captureValidation = require('../../validations/capture.validation');
const captureController = require('../../controllers/capture.controller');

const router = express.Router();

router.post('/event', validate(captureValidation.captureEvent), captureController.captureEvent);

module.exports = router;