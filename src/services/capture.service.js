const httpStatus = require('http-status');
const { Website } = require('../models');
const ApiError = require('../utils/ApiError');
const { parse } = require('url');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const captureEvent = async (eventBody) => {
    console.log('eventBody: ', eventBody);
    if (eventBody.event === 'user_navigation') {
        console.log('navigation');
        const pageType = identifyECommercePageType(eventBody.data.pageUrl);
        console.log('pageType: ', pageType);
    } else {
        console.log('other events');
        const element = eventBody.data.elementIdentifier;
        const elementType = identifyElementType(element);
        console.log('elementType: ', elementType);
    }
    return [];
};



function identifyECommercePageType(url) {
    const parsedUrl = parse(url);

    // Check if the hostname matches known e-commerce platforms
    const host = parsedUrl.hostname.toLowerCase();
    /* const isECommercePlatform = host.includes('amazon.') ||
        host.includes('ebay.') ||
        host.includes('walmart.') ||
        host.includes('etsy.'); */

    const isECommercePlatform = true;

    if (isECommercePlatform) {
        // Check for specific patterns in the pathname to identify page types
        const pathname = parsedUrl.pathname.toLowerCase();

        if (pathname.includes('/product/') || pathname.includes('/p/')) {
            // Extract product information from the URL
            const productInfo = extractProductInfoFromURL(parsedUrl);
            return {
                pageType: 'Products Page',
                product: productInfo,
            };
        }

        if (pathname.includes('/cart') || pathname.includes('/basket')) {
            return { pageType: 'Cart Page' };
        }

        // Add more checks for other types of pages, like checkout, category, etc.
        // For example:
        // if (pathname.includes('/checkout')) {
        //   return { pageType: 'Checkout Page' };
        // }

        // If the URL doesn't match any known patterns, consider it as an unknown page
        return { pageType: 'Other Page' };
    }

    // If the URL's hostname is not recognized as an e-commerce platform, return 'Not an E-commerce URL'
    return { pageType: 'Not an E-commerce URL' };
}

function extractProductInfoFromURL(parsedUrl) {
    const productInfo = {};

    // Extract product ID from the pathname
    const pathname = parsedUrl.pathname;
    const idMatch = pathname.match(/\/(product|p)\/([\w-]+)/);
    if (idMatch && idMatch[2]) {
        productInfo.productId = idMatch[2];
    }

    // Add more product information extraction logic as needed, like product name, category, etc.
    // For example:
    // productInfo.productName = 'Some Product Name';

    return productInfo;
}

function identifyElementType(identifier) {
    // Convert the identifier to lowercase for case-insensitive comparison
    const lowercasedIdentifier = identifier.toLowerCase();

    // Array of known identifiers for each element type
    const cartIdentifiers = ['addtocart', 'add-to-cart', 'cart-button', 'addbutton', 'cartbtn', 'add-cart'];
    const searchInputIdentifiers = ['search', 'searchinput', 'search-input', 'search-box', 'searchbar'];

    // Check if the identifier is present in the arrays of known identifiers
    if (cartIdentifiers.includes(lowercasedIdentifier)) {
        return 'cart';
    }

    if (searchInputIdentifiers.includes(lowercasedIdentifier)) {
        return 'search';
    }

    // If the element identifier doesn't match any known identifiers, consider it as an unknown element
    return 'other';
}


module.exports = {
    captureEvent
};
