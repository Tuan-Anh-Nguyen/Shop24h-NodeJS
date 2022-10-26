// Import thư viện mongoose
const mongoose = require('mongoose');

// Import model
const productModel = require('../models/product_model');

// Create a product
const createProduct = (req, res) => {
     // B1: Thu thập dữ liệu từ req
     let body = req.body;
     // B2: Validate dữ liệu
     if (!body.name) {
          return res.status(400).json({
               message: 'Product Name is required'
          })
     }
     if (!mongoose.Types.ObjectId.isValid(body.type)) {
          return res.status(400).json({
               message: 'Type is invalid'
          })
     }
     if (!body.imageUrl) {
          return res.status(400).json({
               message: 'Product Image URL is required'
          })
     }
     if (!Number.isInteger(body.buyPrice) || body.buyPrice < 0) {
          return res.status(400).json({
               message: 'Buying Price is invalid'
          })
     }
     if (!Number.isInteger(body.promotionPrice) || body.promotionPrice < 0 || body.promotionPrice > body.buyPrice) {
          return res.status(400).json({
               message: 'Promotion Price is invalid'
          })
     }
     if (!Number.isInteger(body.amount) || body.amount < 0) {
          return res.status(400).json({
               message: 'Amount is invalid'
          })
     }
     // B3: Gọi model thực hiện các thao tác nghiệp vụ
     let newProduct = {
          _id: mongoose.Types.ObjectId(),
          name: body.name,
          description: body.description,
          type: body.type,
          imageUrl: body.imageUrl,
          buyPrice: body.buyPrice,
          promotionPrice: body.promotionPrice,
          amount: body.amount
     }
     productModel.create(newProduct, (error, data) => {
          if (error) {
               return res.status(500).json({
                    message: error.message
               })
          }
          return res.status(201).json({
               message: 'Create a new product successfully',
               product: data
          })
     })
}

// Get all products
const getAllProducts = (req, res) => {
     // B1: Thu thập dữ liệu từ req
     let limit = parseInt(req.query.limit);
     // B2: Validate dữ liệu
     const { productName, productType, minPromoPrice, maxPromoPrice } = req.query;

     const condition = {};

     if (productName) {
          const regex = new RegExp(`${productName.toLowerCase()}`);
          condition.name = {
               "$regex": regex,
               "$options": "i"
          }
     }

     if (productType) {
          condition.type = productType;
     }

     if (minPromoPrice) {
          condition.promotionPrice = {
               ...condition.promotionPrice,
               $gte: minPromoPrice
          }
     }

     if (maxPromoPrice) {
          condition.promotionPrice = {
               ...condition.promotionPrice,
               $lte: maxPromoPrice
          }
     }
     // B3: Gọi model thực hiện các thao tác nghiệp vụ
     productModel.find(condition)
          .limit(limit)
          .exec((error, data) => {
               if (error) {
                    return res.status(500).json({
                         message: error.message
                    })
               }
               return res.status(200).json({
                    message: `Get products successfully`,
                    products: data
               })
          })
}

// Get a product by ID
const getProductByID = (req, res) => {
     // B1: Thu thập dữ liệu từ req
     let id = req.params.productID;
     // B2: Validate dữ liệu
     if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({
               message: 'Product ID is invalid'
          })
     }
     // B3: Gọi model thực hiện các thao tác nghiệp vụ
     productModel.findById(id, (error, data) => {
          if (error) {
               return res.status(500).json({
                    message: error.message
               })
          }
          return res.status(200).json({
               message: 'Get a product by ID successfully',
               product: data
          })
     })
}

// Update a product
const updateProduct = (req, res) => {
     // B1: Thu thập dữ liệu từ req
     let id = req.params.productID;
     let body = req.body;
     // B2: Validate dữ liệu
     if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({
               message: 'Product ID is invalid'
          })
     }
     if (body.name !== undefined && body.name == '') {
          return res.status(400).json({
               message: 'Product Name is required'
          })
     }
     if (!mongoose.Types.ObjectId.isValid(body.type)) {
          return res.status(400).json({
               message: 'Type is invalid'
          })
     }
     if (body.imageUrl !== undefined && body.imageUrl == '') {
          return res.status(400).json({
               message: 'Product Image URL is required'
          })
     }
     if (body.buyPrice !== undefined && body.buyPrice == '') {
          return res.status(400).json({
               message: 'Buying Price is invalid'
          })
     }
     if (body.promotionPrice !== undefined && body.promotionPrice == '') {
          return res.status(400).json({
               message: 'Promotion Price is invalid'
          })
     }
     if (body.amount !== undefined && body.amount == '') {
          return res.status(400).json({
               message: 'Amount is invalid'
          })
     }
     // B3: Gọi model thực hiện các thao tác nghiệp vụ
     let productUpdated = {
          name: body.name,
          description: body.description,
          type: body.type,
          imageUrl: body.imageUrl,
          buyPrice: body.buyPrice,
          promotionPrice: body.promotionPrice,
          amount: body.amount
     }
     productModel.findByIdAndUpdate(id, productUpdated, (error, data) => {
          if (error) {
               return res.status(500).json({
                    message: error.message
               })
          }
          return res.status(200).json({
               message: 'Update a product successfully',
               product: data
          })
     })
}

// Delete a product
const deleteProduct = (req, res) => {
     // B1: Thu thập dữ liệu từ req
     let id = req.params.productID;
     // B2: Validate dữ liệu
     if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({
               message: 'Product ID is invalid'
          })
     }
     // B3: Gọi model thực hiện các thao tác nghiệp vụ
     productModel.findByIdAndDelete(id, (error, data) => {
          if (error) {
               return res.status(500).json({
                    message: error.message
               })
          }
          return res.status(204).json({
               message: 'Delete a product successfully'
          })
     })
}

module.exports = { createProduct, getAllProducts, getProductByID, updateProduct, deleteProduct };