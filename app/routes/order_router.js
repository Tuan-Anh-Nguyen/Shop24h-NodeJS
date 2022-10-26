// Import thư viện express
const express = require('express');

// Import middleware
const { orderMiddleware } = require('../middleware/order_middleware');

// Import controller
const { createOrder,
     getAllOrders,
     getAllOrdersOfACustomer,
     getOrderByID,
     updateOrder,
     deleteOrder } = require('../controllers/order_controller');

// Tạo router
const orderRouter = express.Router();

// Sử dụng middleware
orderRouter.use(orderMiddleware);

// Create a new order
orderRouter.post('/customers/:customerID/orders', createOrder);

// Get all orders
orderRouter.get('/orders', getAllOrders);

// Get all orders of a customer
orderRouter.get('/customers/:customerID/orders', getAllOrdersOfACustomer);

// Get an order by ID
orderRouter.get('/orders/:orderID', getOrderByID);

// Update an order
orderRouter.put('/orders/:orderID', updateOrder);

// Delete an order
orderRouter.delete('/customers/:customerID/orders/:orderID', deleteOrder);

module.exports = { orderRouter };