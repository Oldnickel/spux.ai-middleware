const express = require('express');
const validate = require('../../middlewares/validate');
const metadataValidation = require('../../validations/metadata.validation');
const metadataController = require('../../controllers/metadata.controller');

const router = express.Router();

router.post('/create', validate(metadataValidation.create), metadataController.createMetaData);
router.post('/all', validate(metadataValidation.search), metadataController.getMetadata);

module.exports = router;