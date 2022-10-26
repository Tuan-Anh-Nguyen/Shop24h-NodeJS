const productTypeMiddleware = (req, res, next) => {
     console.log(`Method: ${req.method}`);
     next()
}

module.exports = { productTypeMiddleware };