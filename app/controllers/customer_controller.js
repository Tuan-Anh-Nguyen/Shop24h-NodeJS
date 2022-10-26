// Import thư viện mongoose
const mongoose = require('mongoose');

// Import model
const customerModel = require('../models/customer_model');

// Create a customer
const createCustomer = (req, res) => {
     // B1: Thu thập dữ liệu từ req
     let body = req.body;
     // B2: Validate dữ liệu
     if (!body.fullName) {
          return res.status(400).json({
               message: 'Full Name is required!'
          })
     }
     if (!body.phone) {
          return res.status(400).json({
               message: 'Phone is required!'
          })
     }
     var vRegexStr = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     if (!vRegexStr.test(body.email)) {
          return res.status(400).json({
               message: 'Email is invalid'
          })
     }
     // B3: Gọi model thực hiện các thao tác nghiệp vụ
     let newCustomer = {
          _id: mongoose.Types.ObjectId(),
          fullName: body.fullName,
          phone: body.phone,
          email: body.email,
          address: body.address,
          city: body.city,
          country: body.country
     }
     customerModel.create(newCustomer, (error, data) => {
          if (error) {
               return res.status(500).json({
                    message: error.message
               })
          }
          return res.status(201).json({
               message: 'Create a new customer successfully',
               customer: data
          })
     })
}

// Get all customers
const getAllCustomers = (req, res) => {
     // B1: Thu thập dữ liệu từ req
     // B2: Validate dữ liệu
     // B3: Gọi model thực hiện các thao tác nghiệp vụ
     customerModel.find((error, data) => {
          if (error) {
               return res.status(500).json({
                    message: error.message
               })
          }
          return res.status(200).json({
               message: 'Get all customers successfully',
               customers: data
          })
     })
}

// Get a customer by ID
const getCustomerByID = (req, res) => {
     // B1: Thu thập dữ liệu từ req
     let id = req.params.customerID;
     // B2: Validate dữ liệu
     if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({
               message: 'Customer ID is invalid'
          })
     }
     // B3: Gọi model thực hiện các thao tác nghiệp vụ
     customerModel.findById(id, (error, data) => {
          if (error) {
               return res.status(500).json({
                    message: error.message
               })
          }
          return res.status(200).json({
               message: 'Get a customer successfully',
               customers: data
          })
     })
}

// Update a customer
const updateCustomer = (req, res) => {
     // B1: Thu thập dữ liệu từ req
     let id = req.params.customerID;
     let body = req.body;
     // B2: Validate dữ liệu
     if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({
               message: 'Customer ID is invalid'
          })
     }
     if (body.fullName !== undefined && body.fullName == '') {
          return res.status(400).json({
               message: 'Full Name is required!'
          })
     }
     if (body.phone !== undefined && body.phone == '') {
          return res.status(400).json({
               message: 'Phone is required!'
          })
     }
     if (body.email !== undefined && body.email == '') {
          return res.status(400).json({
               message: 'Email is required!'
          })
     }
     // B3: Gọi model thực hiện các thao tác nghiệp vụ
     let customerUpdated = {
          fullName: body.fullName,
          phone: body.phone,
          email: body.email,
          address: body.address,
          city: body.city,
          country: body.country
     }
     customerModel.findByIdAndUpdate(id, customerUpdated, (error, data) => {
          if (error) {
               return res.status(500).json({
                    message: error.message
               })
          }
          return res.status(200).json({
               message: 'Update a customer successfully',
               customer: data
          })
     })
}

// Delete a customer
const deleteCustomer = (req, res) => {
     // B1: Thu thập dữ liệu từ req
     let id = req.params.customerID;
     // B2: Validate dữ liệu
     if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({
               message: 'Customer ID is invalid'
          })
     }
     // B3: Gọi model thực hiện các thao tác nghiệp vụ
     customerModel.findByIdAndDelete(id , (error, data) => {
          if (error) {
               return res.status(500).json({
                    message: error.message
               })
          }
          return res.status(204).json({
               message: 'Delete a customer successfully'
          })
     })
}

module.exports = { createCustomer, getAllCustomers, getCustomerByID, updateCustomer, deleteCustomer };
