// Import thư viện express
const express = require('express');

// Import middleware
const { productTypeMiddleware } = require('../middleware/productType_middleware');

// Import controllers
const { createProductType,
     getAllProductTypes,
     getProductTypeByID,
     updateProductType,
     deleteProductType } = require('../controllers/productType_controller');

// Tạo router
const productTypeRouter = express.Router();

// Sử dụng middleware
productTypeRouter.use(productTypeMiddleware);

// Create a product type
productTypeRouter.post('/productType', createProductType);

// Get all product types
productTypeRouter.get('/productType', getAllProductTypes);

// Get a product type by ID
productTypeRouter.get('/productType/:productTypeID', getProductTypeByID);

// Update a product type
productTypeRouter.put('/productType/:productTypeID', updateProductType);

// Delete a product type
productTypeRouter.delete('/productType/:productTypeID', deleteProductType);

module.exports = { productTypeRouter };