// Import thư viện express
const express = require('express');

// Import middleware
const { productMiddleware } = require('../middleware/product_middleware');

// Import controller
const { createProduct,
     getAllProducts,
     getProductByID,
     updateProduct,
     deleteProduct } = require('../controllers/product_controller');

// Tạo router
const productRouter = express.Router();

// Sử dụng middleware
productRouter.use(productMiddleware);

// Create a product
productRouter.post('/products', createProduct);

// Get all products with limit
productRouter.get('/products', getAllProducts);

// Get a product by ID
productRouter.get('/products/:productID', getProductByID);

// Update a product
productRouter.put('/products/:productID', updateProduct);

// Delete a product
productRouter.delete('/products/:productID', deleteProduct);

module.exports = { productRouter };