// Import thư viện express
const express = require('express');

// Import thư viện mongoose
const mongoose = require('mongoose');

// Import cors
const cors = require("cors");

// Kết nối mongoDB
mongoose.connect('mongodb://localhost:27017/CRUD_Shop24h', function (error) {
     if (error) throw error;
     console.log('Successfully connected');
})

// Import routers
const { productTypeRouter } = require('./app/routes/productType_router');
const { productRouter } = require('./app/routes/product_router');
const { customerRouter } = require('./app/routes/customer_router');
const { orderRouter } = require('./app/routes/order_router');
const { orderDetailsRouter } = require('./app/routes/orderDetails.router');

// Tạo app
const app = new express();

// Tạo cổng chạy
const port = 8000;

// Import auth middleware
const authMiddleware = require("./app/middleware/auth-middleware");

// Sử dụng đc body json
app.use(express.json());

// Sử dụng đc unicode
app.use(express.urlencoded({
     extended: true
}))

// Sử dụng cors
app.use(cors());

// Tránh lỗi CORS
app.use(function (req, res, next) {
     res.setHeader('Access-Control-Allow-Origin', '*');
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
     res.setHeader('Access-Control-Allow-Credentials', true);
     next();
});

// Sử dụng authMiddleware
app.use('/customers', authMiddleware);

// Sử dụng routers
app.use(productTypeRouter);
app.use(productRouter);
app.use(customerRouter);
app.use(orderRouter);
app.use(orderDetailsRouter);

app.listen(port, () => {
     console.log(`App listening to port ${port}`);
})