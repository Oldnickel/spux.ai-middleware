const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
// Define a generic schema for products
const productSchema = new mongoose.Schema(
    {
        // Common fields that all products might have
        name: { type: String, required: true },
        price: { type: Number, required: true },
        brand: { type: String },
        category: { type: String },

        // Dynamic fields that can vary for different products
        dynamicFields: { type: Map, of: mongoose.Schema.Types.Mixed },
    },
    { timestamps: true } // This will automatically add "createdAt" and "updatedAt" fields
);

productSchema.plugin(toJSON);
productSchema.plugin(paginate);


// Export the model
const Product = mongoose.model('Product', productSchema);
module.exports = Product;