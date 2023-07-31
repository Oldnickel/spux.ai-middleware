const httpStatus = require('http-status');
const Product = require('../models/product.model');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const findProducts = async (productName) => {
    const products = Product.find({ name: productName });
    //console.log('products: ', products);

    if (products) {
        return products;
    } else {
        return 'No products matching your query have been found.';
    }
};

const saveProduct = async (product) => {
    try {
        const newProduct = new Product(product);
        await newProduct.save()
        return 'success';
    } catch (error) {
        return "Error saving product: " + error.message;
    }
};

module.exports = {
    findProducts,
    saveProduct
};
