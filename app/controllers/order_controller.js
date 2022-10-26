// Import thư viện mongoose
const mongoose = require('mongoose');

// Import models
const orderModel = require('../models/order_model');
const customerModel = require('../models/customer_model');

// Create a new order
const createOrder = (req, res) => {
     // B1: Thu thập dữ liệu từ req
     let customerID = req.params.customerID;
     let body = req.body;
     // B2: Validate dữ liệu
     if (!mongoose.Types.ObjectId.isValid(customerID)) {
          return res.status(400).json({
               message: 'Customer ID is invalid'
          })
     }
     // B3: Gọi model thực hiện các thao tác nghiệp vụ
     let newOrder = {
          _id: mongoose.Types.ObjectId(),
          orderDate: body.orderDate,
          shippedDate: body.shippedDate,
          note: body.note,
          orderDetails: body.orderDetails,
          cost: body.cost
     }
     orderModel.create(newOrder, (error, data) => {
          if (error) {
               return res.status(500).json({
                    message: error.message
               })
          } else {
               customerModel.findByIdAndUpdate(customerID,
                    {
                         $push: { orders: data._id }
                    },
                    (err, updatedCustomer) => {
                         if (err) {
                              return res.status(500).json({
                                   message: err.message
                              })
                         }
                         return res.status(201).json({
                              message: 'Create a new order successfully',
                              order: data
                         })
                    })
          }
     })
}

// Get all orders
const getAllOrders = (req, res) => {
     // B1: Thu thập dữ liệu từ req
     // B2: Validate dữ liệu
     // B3: Gọi model thực hiện các thao tác nghiệp vụ
     orderModel.find((error, data) => {
          if (error) {
               return res.status(500).json({
                    message: error.message
               })
          }
          return res.status(200).json({
               message: "Get all orders successfully",
               orders: data
          })
     })
}

// Get all orders of a customer
const getAllOrdersOfACustomer = (req, res) => {
     // B1: Thu thập dữ liệu từ req
     let customerID = req.params.customerID;
     // B2: Validate dữ liệu
     if (!mongoose.Types.ObjectId.isValid(customerID)) {
          return res.status(400).json({
               message: 'Customer ID is invalid'
          })
     }
     // B3: Gọi model thực hiện các thao tác nghiệp vụ
     customerModel.findById(customerID)
          .populate('orders')
          .exec((error, data) => {
               if (error) {
                    return res.status(500).json({
                         message: error.message
                    })
               } else {
                    return res.status(200).json({
                         message: 'Get all orders successfully',
                         orders: data.orders
                    })
               }
          })
}

// Get an order by ID
const getOrderByID = (req, res) => {
     // B1: Thu thập dữ liệu từ req
     let id = req.params.orderID;
     // B2: Validate dữ liệu
     if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({
               message: 'Order ID is invalid'
          })
     }
     // B3: Gọi model thực hiện các thao tác nghiệp vụ
     orderModel.findById(id, (error, data) => {
          if (error) {
               return res.status(500).json({
                    message: error.message
               })
          } else {
               return res.status(200).json({
                    message: 'Get an order by ID successfully',
                    order: data
               })
          }
     })
}

// Update an order
const updateOrder = (req, res) => {
     // B1: Thu thập dữ liệu từ req
     let id = req.params.orderID;
     let body = req.body;
     // B2: Validate dữ liệu
     if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({
               message: 'Order ID is invalid'
          })
     }
     // B3: Gọi model thực hiện các thao tác nghiệp vụ
     let orderUpdated = {
          orderDate: body.orderDate,
          shippedDate: body.shippedDate,
          note: body.note,
          orderDetails: body.orderDetails,
          cost: body.cost
     }
     orderModel.findByIdAndUpdate(id, orderUpdated, (error, data) => {
          if (error) {
               return res.status(500).json({
                    message: error.message
               })
          } else {
               return res.status(200).json({
                    message: 'Update an order by ID successfully',
                    order: data
               })
          }
     })
}

// Delete an order
const deleteOrder = (req, res) => {
     // B1: Thu thập dữ liệu từ req
     let customerID = req.params.customerID;
     let orderID = req.params.orderID;
     // B2: Validate dữ liệu
     if (!mongoose.Types.ObjectId.isValid(customerID)) {
          return res.status(400).json({
               message: 'Customer ID is invalid'
          })
     }
     if (!mongoose.Types.ObjectId.isValid(orderID)) {
          return res.status(400).json({
               message: 'Order ID is invalid'
          })
     }
     // B3: Gọi model thực hiện các thao tác nghiệp vụ
     orderModel.findByIdAndDelete(orderID, (error, data) => {
          if (error) {
               return res.status(500).json({
                    message: error.message
               })
          } else {
               // Sau khi xóa xong 1 order khỏi collection cần xóa thêm orderID trong customer đang chứa nó
               customerModel.findByIdAndUpdate(customerID,
                    {
                         $pull: { orders: orderID }
                    },
                    (err, updatedCustomer) => {
                         if (err) {
                              return res.status(500).json({
                                   message: err.message
                              })
                         }
                         return res.status(204).json({
                              message: 'Delete an order successfully'
                         })

                    })
          }
     })
}

module.exports = { createOrder, getAllOrders, getAllOrdersOfACustomer, getOrderByID, updateOrder, deleteOrder };