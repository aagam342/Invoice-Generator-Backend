// middleware/authMiddleware.js

const jwt = require("jsonwebtoken");
const config = require("../config");

function verifyToken(req, res, next) {
  const token = req.header("Authorization");
  console.log("Received Token:", token);

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized - No token provided" });
  }

  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }

    req.user = decoded.user;
    console.log("Decoded User:", decoded.user);

    next();
  });
}

module.exports = verifyToken;
