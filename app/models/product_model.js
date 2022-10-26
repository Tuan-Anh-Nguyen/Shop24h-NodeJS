// Import thư viện mongoose
const mongoose = require('mongoose');

// Tạo class Schema
const Schema = mongoose.Schema;

// Khai báo product schema
const productModel = new Schema({
     _id: {
          type: mongoose.Types.ObjectId
     },
     name: {
          type: String,
          unique: true,
          required: true
     },
     description: {
          type: String
     },
     type: {
          type: Schema.Types.ObjectId,
          ref: 'Product_Type',
          required: true
     },
     imageUrl: {
          type: String,
          required: true
     },
     buyPrice: {
          type: Number,
          required: true
     },
     promotionPrice: {
          type: Number,
          required: true
     },
     amount: {
          type: Number,
          default: 0
     }
}, {
     timestamps: true
})

module.exports = mongoose.model('product', productModel);