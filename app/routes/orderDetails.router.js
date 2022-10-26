// Import thư viện express
const express = require('express');

// Import middleware
const { orderDetailsMiddleware } = require('../middleware/orderDetails_middleware');

// Import controller
const { createOrderDetails,
     getAllOrderDetailsOfAnOrder,
     getOrderDetailsByID,
     updateOrderDetails,
     deleteOrderDetails } = require('../controllers/orderDetails_controller');

// Tạo router
const orderDetailsRouter = express.Router();

// Sử dụng middleware
orderDetailsRouter.use(orderDetailsMiddleware);

// Create order details
orderDetailsRouter.post('/orders/:orderID/orderDetails', createOrderDetails);

// Get all order details of an order
orderDetailsRouter.get('/orders/:orderID/orderDetails', getAllOrderDetailsOfAnOrder);

// Get an order detail
orderDetailsRouter.get('/orderDetails/:orderDetailsID', getOrderDetailsByID);

// Update an order detail
orderDetailsRouter.put('/orderDetails/:orderDetailsID', updateOrderDetails);

// Delete an order detail
orderDetailsRouter.delete('/orders/:orderID/orderDetails/:orderDetailsID', deleteOrderDetails);

module.exports = { orderDetailsRouter };