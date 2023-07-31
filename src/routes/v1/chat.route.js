const express = require('express');
const validate = require('../../middlewares/validate');
const chatValidation = require('../../validations/chat.validation');
const chatController = require('../../controllers/chat.controller');

const router = express.Router();

router.post('/findProducts', validate(chatValidation.findProducts), chatController.findProducts);
router.post('/saveProduct', validate(chatValidation.saveProduct), chatController.saveProduct);

module.exports = router;