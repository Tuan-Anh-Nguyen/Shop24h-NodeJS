// Import thư viện mongoose
const mongoose = require('mongoose');

// Tạo class Schema
const Schema = mongoose.Schema;

// Khai báo order schema
const orderModel = new Schema({
     _id: {
          type: mongoose.Types.ObjectId
     },
     orderDate: {
          type: Date,
          default: Date.now()
     },
     shippedDate: {
          type: Date
     },
     note: {
          type: String
     },
     orderDetails: [{
          type: mongoose.Types.ObjectId,
          ref: "Order_Details"
     }],
     cost: {
          type: Number,
          default: 0
     }
}, {
     timestamps: true
})

module.exports = mongoose.model('Order', orderModel);