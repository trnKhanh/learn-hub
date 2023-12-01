const jwt = require("jsonwebtoken");
const fs = require("fs");

validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");
  
  if (!accessToken) {
    res.status("401").send({
      message: "User has not logged in",
    });
  }
  try {
    const publicKey = fs.readFileSync("jwt.key.pub");
    const validToken = jwt.verify(accessToken, publicKey);
    next();
  } catch (err) {
    res.status("401").json(err);
  }
}

module.exports = validateToken;

