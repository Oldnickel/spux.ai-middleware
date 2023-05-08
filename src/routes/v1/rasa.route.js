const express = require('express');
const validate = require('../../middlewares/validate');
const rasaValidation = require('../../validations/rasa.validation');
const rasaController = require('../../controllers/rasa.controller');

const router = express.Router();

router.post('/chat', validate(rasaValidation.chat), rasaController.chat);

module.exports = router;