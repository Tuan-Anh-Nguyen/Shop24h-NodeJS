// Import thư viện express
const express = require('express');

// Import middleware
const { customerMiddleware } = require('../middleware/customer_middleware');

// Import controller
const { createCustomer,
     getAllCustomers,
     getCustomerByID,
     updateCustomer,
     deleteCustomer } = require('../controllers/customer_controller');

// Tạo router
const customerRouter = express.Router();

// Sử dụng middleware
customerRouter.use(customerMiddleware);

// Create a customer
customerRouter.post('/customers', createCustomer);

// Get all customers
customerRouter.get('/customers', getAllCustomers);

// Get a customer by ID
customerRouter.get('/customers/:customerID', getCustomerByID);

// Update a customer
customerRouter.put('/customers/:customerID', updateCustomer);

// Delete a customer
customerRouter.delete('/customers/:customerID', deleteCustomer);

module.exports = { customerRouter };