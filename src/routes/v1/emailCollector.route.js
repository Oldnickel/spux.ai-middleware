const express = require('express');
const validate = require('../../middlewares/validate');
const emailCollectorValidation = require('../../validations/emailCollector.validation');
const emailCollectorController = require('../../controllers/emailCollector.controller');

const router = express.Router();

router.post('/create', validate(emailCollectorValidation.create), emailCollectorController.createEmail);
router.post('/search', validate(emailCollectorValidation.search), emailCollectorController.getEmail);
router.post('/all', validate(emailCollectorValidation.getEmails), emailCollectorController.getEmails);

module.exports = router;