// Import thư viện mongoose
const mongoose = require('mongoose');

// Tạo class Schema
const Schema = mongoose.Schema;

// Khai báo customer schema
const customerModel = new Schema({
     _id: {
          type: mongoose.Types.ObjectId
     },
     fullName: {
          type: String,
          required: true,
     },
     phone: {
          type: String,
          required: true,
          unique: true
     },
     email: {
          type: String,
          required: true,
          unique: true
     },
     address: {
          type: String,
          default: ''
     },
     city: {
          type: String,
          default: ''
     },
     country: {
          type: String,
          default: ''
     },
     orders: [{
          type: mongoose.Types.ObjectId,
          ref: "Order"
     }]
}, {
     timestamps: true
})

module.exports = mongoose.model('Customer', customerModel);