// Import thư viện mongoose
const mongoose = require('mongoose');

// Tạo class Schema
const Schema = mongoose.Schema;

// Khai báo order details schema
const orderDetailsModel = new Schema({
     _id: {
          type: mongoose.Types.ObjectId
     },
     product: {
          type: mongoose.Types.ObjectId,
          ref: 'Product'
     },
     quantity: {
          type: Number,
          default: 0
     }
}, {
     timestamps: true
})

module.exports = mongoose.model('Order_Details', orderDetailsModel);