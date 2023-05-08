const express = require('express');
const validate = require('../../middlewares/validate');
const visitorValidation = require('../../validations/visitor.validation');
const visitorController = require('../../controllers/visitor.controller');

const router = express.Router();

router.post('/update', validate(visitorValidation.update), visitorController.updateVisitor);
router.post('/create', validate(visitorValidation.create), visitorController.createVisitor);
router.post('/find', validate(visitorValidation.search), visitorController.getVisitor);

module.exports = router;