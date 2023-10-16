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
                        imageUri: 'https://m.media-amazon.com/images/I/81MM6iM6TLL._SY522_.jpg',
                        buttons: [
                            {
                                text: "Buy Now",
                                postback: 'https://www.amazon.com/Mandala-Colouring-Adults-Paperback-Editorial/dp/938653861X/ref=sr_1_2?crid=6TCCO58SIOL6&keywords=mandala&qid=1697460852&sprefix=manda%2Caps%2C345&sr=8-2',
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
