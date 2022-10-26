// Import thư viện mongoose
const mongoose = require('mongoose');

// Import models
const orderDetailsModel = require('../models/orderDetails_model');
const orderModel = require('../models/order_model');

// Create order details
const createOrderDetails = (req, res) => {
     // B1: Thu thập dữ liệu từ req
     let orderID = req.params.orderID;
     let body = req.body;
     // B2: Validate dữ liệu
     if (!mongoose.Types.ObjectId.isValid(orderID)) {
          return res.status(400).json({
               message: 'Order ID is invalid'
          })
     }
     if (!mongoose.Types.ObjectId.isValid(body.product)) {
          return res.status(400).json({
               message: 'Product ID is invalid'
          })
     }
     if (!Number.isInteger(body.quantity) || body.quantity < 0) {
          return res.status(400).json({
               message: 'Quantity is invalid'
          })
     }
     // B3: Gọi model thực hiện các thao tác nghiệp vụ
     let newOrderDetails = {
          _id: mongoose.Types.ObjectId(),
          product: body.product,
          quantity: body.quantity
     }
     orderDetailsModel.create(newOrderDetails, (error, data) => {
          if (error) {
               return res.status(500).json({
                    message: error.message
               })
          } else {
               orderModel.findByIdAndUpdate(orderID,
                    {
                         $push: { orderDetails: data._id }
                    },
                    (err, updatedOrder) => {
                         if (err) {
                              return res.status(500).json({
                                   message: err.message
                              })
                         }
                         return res.status(201).json({
                              message: 'Create order details successfully',
                              orderDetails: data
                         })
                    })
          }
     })
}

// Get all order details of an order
const getAllOrderDetailsOfAnOrder = (req, res) => {
     // B1: Thu thập dữ liệu từ req
     let orderID = req.params.orderID;
     // B2: Validate dữ liệu
     if (!mongoose.Types.ObjectId.isValid(orderID)) {
          return res.status(400).json({
               message: 'Order ID is invalid'
          })
     }
     // B3: Gọi model thực hiện các thao tác nghiệp vụ
     orderModel.findById(orderID)
          .populate('orderDetails')
          .exec((error, data) => {
               if (error) {
                    return res.status(500).json({
                         message: error.message
                    })
               } else {
                    return res.status(200).json({
                         message: 'Get all order details successfully',
                         orderDetails: data.orderDetails
                    })
               }
          })
}

// Get an order detail
const getOrderDetailsByID = (req, res) => {
     // B1: Thu thập dữ liệu từ req
     let orderDetailsID = req.params.orderDetailsID;
     // B2: Validate dữ liệu
     if (!mongoose.Types.ObjectId.isValid(orderDetailsID)) {
          return res.status(400).json({
               message: 'Order Details ID is invalid'
          })
     }
     // B3: Gọi model thực hiện các thao tác nghiệp vụ
     orderDetailsModel.findById(orderDetailsID, (error, data) => {
          if (error) {
               return res.status(500).json({
                    message: error.message
               })
          } else {
               return res.status(200).json({
                    message: 'Get an order by ID successfully',
                    orderDetails: data
               })
          }
     })
}

// Update an order detail
const updateOrderDetails = (req, res) => {
     // B1: Thu thập dữ liệu từ req
     let orderDetailsID = req.params.orderDetailsID;
     let body = req.body;
     // B2: Validate dữ liệu
     if (!mongoose.Types.ObjectId.isValid(orderDetailsID)) {
          return res.status(400).json({
               message: 'Order Details ID is invalid'
          })
     }
     // if (!mongoose.Types.ObjectId.isValid(body.product)) {
     //      return res.status(400).json({
     //           message: 'Product ID is invalid'
     //      })
     // }
     if (body.quantity !== undefined && body.quantity == "") {
          return res.status(400).json({
               message: 'Quantity is invalid'
          })
     }
     // B3: Gọi model thực hiện các thao tác nghiệp vụ
     let updatedOrderDetails = {
          product: body.product,
          quantity: body.quantity
     }
     orderDetailsModel.findByIdAndUpdate(orderDetailsID, updatedOrderDetails, (error, data) => {
          if (error) {
               return res.status(500).json({
                    message: error.message
               })
          } else {
               return res.status(200).json({
                    message: 'Update an order detail by ID successfully',
                    orderDetails: data
               })
          }
     })
}

// Delete an order detail
const deleteOrderDetails = (req, res) => {
     // B1: Thu thập dữ liệu từ req
     let orderID = req.params.orderID;
     let orderDetailsID = req.params.orderDetailsID;
     // B2: Validate dữ liệu
     if (!mongoose.Types.ObjectId.isValid(orderID)) {
          return res.status(400).json({
               message: 'Order ID is invalid'
          })
     }
     if (!mongoose.Types.ObjectId.isValid(orderDetailsID)) {
          return res.status(400).json({
               message: 'Order Details ID is invalid'
          })
     }
     // B3: Gọi model thực hiện các thao tác nghiệp vụ
     orderDetailsModel.findByIdAndDelete(orderDetailsID, (error, data) => {
          if (error) {
               return res.status(500).json({
                    message: error.message
               })
          } else {
               orderModel.findByIdAndUpdate(orderID,
                    {
                         $pull: { orderDetails: orderDetailsID }
                    },
                    (err, updatedOrderDetails) => {
                         if (err) {
                              return res.status(500).json({
                                   message: err.message
                              })
                         } else {
                              return res.status(204).json({
                                   message: 'Delete an order detail successfully'
                              })
                         }
                    })
          }
     })
}

module.exports = { createOrderDetails, getAllOrderDetailsOfAnOrder, getOrderDetailsByID, updateOrderDetails, deleteOrderDetails };