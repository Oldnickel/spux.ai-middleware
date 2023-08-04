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
        const richCardMessage = {
            fulfillmentMessages: [
                {
                    card: {
                        title: `Product Information - ${productName}`,
                        subtitle: productInfo.description,
                        imageUri: productInfo.imageURL,
                        buttons: [
                            {
                                text: "Buy Now",
                                postback: `https://example.com/buy-product/${productInfo.id}`,
                            },
                            {
                                text: "More Details",
                                postback: `https://example.com/product-details/${productInfo.id}`,
                            },
                        ],
                    },
                },
            ],
        };
        return res.json(fulfillmentMessages);
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
