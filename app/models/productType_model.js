// Import thư viện mongoose
const mongoose = require('mongoose');

// Tạo class Schema
const Schema = mongoose.Schema;

// Khai báo product type schema
const productTypeModel = new Schema({
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
}, {
     timestamps: true
})

module.exports = mongoose.model('Product_Type', productTypeModel);