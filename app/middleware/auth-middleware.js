const firebase = require('../../firebase/admin');

function authMiddleware(req, res, next) {
     const headerToken = req.headers.authorization;
     if (!headerToken) {
          return res.status(401).send({ message: "No token provided!" })
     }
     if (headerToken && headerToken.split(" ")[0] !== "Bearer") {
          return res.status(401).send({ message: "Invalid token!" })
     }

     const token = headerToken.split(" ")[1];

     firebase
          .auth()
          .verifyIdToken(token)
          .then(() => {
               // Validate user on database

               next();
          })
          .catch(() => res.status(403).send({ message: "Could not authorize!" }))
}

module.exports = authMiddleware;