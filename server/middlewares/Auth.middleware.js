const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

let validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");
  try {
    const publicKey = fs.readFileSync(path.join(__dirname, "../jwt.key.pub"));
    const validToken = jwt.verify(accessToken, publicKey);

    req.user = validToken;
    next();
  } catch (err) {
    res.status(401).json(err);
  }
};

module.exports = validateToken;
