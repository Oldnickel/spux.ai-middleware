const httpStatus = require('http-status');
const { Product } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const findProducts = async (productName) => {
    const products = await Product.find({ name: productName }).lean();

    if (products.length > 0) {
        console.log('products: ', products);
        const productInfo = products[0]
        const richCardMessage = {
            fulfillmentMessages: [
                {
                    card: {
                        title: `Product Information - ${productInfo.name}`,
                        subtitle: productInfo.brand,
                        imageUri: 'https://salesmate.aiceafrica.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F8144%2F8724%2Ffiles%2Fmockup-de719380.webp%3Fv%3D1682956169&w=2048&q=75',
                        buttons: [
                            {
                                text: "Buy Now",
                                postback: `https://example.com/buy-product/${productInfo.name}`,
                            },
                            {
                                text: "More Details",
                                postback: `https://example.com/product-details/${productInfo.name}`,
                            },
                        ],
                    },
                },
            ],
        };

        //console.log(richCardMessage)

        return richCardMessage;
    } else {
        return 'No products matching your query have been found.';
    }
    //console.log('products: ', products);
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
