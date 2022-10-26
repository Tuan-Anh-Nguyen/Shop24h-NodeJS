// Import thư viện mongoose
const mongoose = require('mongoose');

// Import model
const productTypeModel = require('../models/productType_model');

// Create a product type
const createProductType = (req, res) => {
     // B1: Thu thập dữ liệu từ req
     let body = req.body;
     // B2: Validate dữ liệu
     if (!body.name) {
          return res.status(400).json({
               message: 'Product Type Name is required!'
          })
     }
     // B3: Gọi model thực hiện các thao tác nghiệp vụ
     let newProductType = {
          _id: mongoose.Types.ObjectId(),
          name: body.name,
          description: body.description
     }
     productTypeModel.create(newProductType, (error, data) => {
          if (error) {
               return res.status(500).json({
                    message: error.message
               })
          }
          return res.status(201).json({
               message: 'Create a new product type successfully',
               newProductType: data
          })
     })
}

// Get all product types
const getAllProductTypes = (req, res) => {
     // B1: Thu thập dữ liệu từ req
     // B2: Validate dữ liệu
     // B3: Gọi model thực hiện các thao tác nghiệp vụ
     productTypeModel.find((error, data) => {
          if (error) {
               return res.status(500).json({
                    message: error.message
               })
          }
          return res.status(200).json({
               message: 'Get all product types successfully',
               productTypes: data
          })
     })
}

// Get a product type by ID
const getProductTypeByID = (req, res) => {
     // B1: Thu thập dữ liệu từ req
     let id = req.params.productTypeID;
     // B2: Validate dữ liệu
     if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({
               message: 'Product Type ID is invalid!'
          })
     }
     // B3: Gọi model thực hiện các thao tác nghiệp vụ
     productTypeModel.findById(id, (error, data) => {
          if (error) {
               return res.status(500).json({
                    message: error.message
               })
          }
          return res.status(200).json({
               message: 'Get a product type by ID successfully',
               productType: data
          })
     })
}

// Update a product type
const updateProductType = (req, res) => {
     // B1: Thu thập dữ liệu từ req
     let id = req.params.productTypeID;
     let body = req.body;
     // B2: Validate dữ liệu
     if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({
               message: 'Product Type ID is invalid!'
          })
     }
     if (body.name !== undefined && body.name == '') {
          return res.status(400).json({
               message: 'Product Type Name is required!'
          })
     }
     // B3: Gọi model thực hiện các thao tác nghiệp vụ
     let productTypeUpdated = {
          name: body.name,
          description: body.description
     }
     productTypeModel.findByIdAndUpdate(id, productTypeUpdated, (error, data) => {
          if (error) {
               return res.status(500).json({
                    message: error.message
               })
          }
          return res.status(200).json({
               message: 'Update a product type successfully',
               productType: data
          })
     })
}

// Delete a product type
const deleteProductType = (req, res) => {
     // B1: Thu thập dữ liệu từ req
     let id = req.params.productTypeID;
     // B2: Validate dữ liệu
     if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({
               message: 'Product Type ID is invalid!'
          })
     }
     // B3: Gọi model thực hiện các thao tác nghiệp vụ
     productTypeModel.findByIdAndDelete(id, (error, data) => {
          if (error) {
               return res.status(500).json({
                    message: error.message
               })
          }
          return res.status(204).json({
               message: 'Delete a product type successfully'
          })
     })
}

module.exports = { createProductType, getAllProductTypes, getProductTypeByID, updateProductType, deleteProductType };