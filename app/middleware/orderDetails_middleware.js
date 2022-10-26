const orderDetailsMiddleware = (req, res, next) => {
     console.log(`Method: ${req.method}`);
     next()
}

module.exports = { orderDetailsMiddleware };