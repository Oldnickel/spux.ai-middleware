const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { chatService } = require('../services');

const findProducts = catchAsync(async (req, res) => {
    const productName = req.body.queryResult.parameters.product;
    console.log('productName: ', productName);
    const products = await chatService.findProducts(productName);
    res.json(products);
});

const saveProduct = catchAsync(async (req, res) => {
    const product = await chatService.saveProduct(req.body);
    res.status(httpStatus.CREATED).send(product);
});

module.exports = {
    findProducts,
    saveProduct
};
