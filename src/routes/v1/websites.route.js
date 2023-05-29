const express = require('express');
const validate = require('../../middlewares/validate');
const websiteValidation = require('../../validations/website.validation');
const websiteController = require('../../controllers/website.controller');

const router = express.Router();

router.post('/update', validate(websiteValidation.update), websiteController.updateWebsite);
router.post('/create', validate(websiteValidation.create), websiteController.createWebsite);
router.post('/search', validate(websiteValidation.queryWebsites), websiteController.queryWebsites);
router.post('/all', validate(websiteValidation.getAllWebsites), websiteController.getAllWebsites);

module.exports = router;