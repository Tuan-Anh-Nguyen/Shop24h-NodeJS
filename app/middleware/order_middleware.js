const orderMiddleware = (req, res, next) => {
     console.log(`Method: ${req.method}`);
     next()
}

module.exports = { orderMiddleware };