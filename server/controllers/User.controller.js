const User = require("../models/User.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const saltRounds = 10;

// Create new user
exports.signup = async (req, res) => {
  // if request is invalid (empty body)
  if (!req.body) {
    res.status("400").send({
      message: "Content cannot be empty",
    });
  }

  let username = req.body.username;
  let password = req.body.password;
  let hashedPassword = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username: username,
    password: password,
  });

  User.create(user, (err, user) => {
    if (err) {
      res.status("500").send({
        message: err.message || "Errors occur when creating new user",
      });
    } else {
      // Create new access token
      const privateKey = fs.readFileSync("jwt.key");
      const accessToken = jwt.sign({
        username: user.username,
      }, privateKey, { algorithm: 'RS256', expiresIn: "1d"});

      res.json({
        message: "Sign up successfully",
        accessToken: accessToken,
      });
    }
  });
}


// Login user
exports.login = async (req, res) => {
  // if request is invalid (empty body)
  if (!req.body) {
    res.status("400").send({
      message: "Content cannot be empty",
    });
  }

  let username = req.body.username;
  let password = req.body.password;

  // Find user with given username
  User.findOne({ username: username }, async (err, user) => {
    if (err) {
      res.status("500").send({
        message: err.message || "Errors occur when find user",
      });
    }

    if (!user) {
      res.status("401").json({
        message: "User do not exists",
      })
    }
    // Check password
    let matched = await bcrypt.compare(password, user.password);
    if (matched) {
      // Create new access token
      const privateKey = fs.readFileSync("jwt.key");
      const accessToken = jwt.sign({
        username: user.username,
      }, privateKey, { algorithm: 'RS256', expiresIn: "1d"});

      res.json({
        message: "Log in successfully",
        accessToken: accessToken,
      });
    } else {
      res.status("401").json({
        message: "Wrong password",
      });
    }
  })
}
