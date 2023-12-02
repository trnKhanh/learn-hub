const User = require("../models/User.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const saltRounds = 10;

// Create new user
exports.signup = async (req, res) => {
  // if request is invalid (empty body)
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty",
    });
    return;
  }

  let username = req.body.username;
  let password = req.body.password;
  let hashedPassword = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username: username,
    password: hashedPassword,
  });

  User.create(user, (err, user) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Errors occur when creating new user",
      });
      return;
    }
    // Create new access token
    // const privateKey = fs.readFileSync(path.join(__dirname, "../jwt.key"));
    // const accessToken = jwt.sign({
    //   user_id: user.id,
    // }, privateKey, { algorithm: 'RS256', expiresIn: "1d" });

    res.json({
      message: "Sign up successfully",
      // accessToken: accessToken,
    });

  });
}


// Login user
exports.login = async (req, res) => {
  // if request is invalid (empty body)
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty",
    });
    return;
  }

  let username = req.body.username;
  let password = req.body.password;

  // Find user with given username
  User.findOne({ username: username }, async (err, user) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Errors occur when find user",
      });
      return;
    }

    if (!user) {
      res.status(401).json({
        message: "User do not exists",
      })
      return;
    }
    // Check password
    let matched = await bcrypt.compare(password, user.password);
    if (matched) {
      // Create new access token
      const privateKey = fs.readFileSync(path.join(__dirname, "../jwt.key"));
      const accessToken = jwt.sign({
        username: user.username,
        user_id: user.id,
      }, privateKey, { algorithm: 'RS256', expiresIn: "1d" });

      res.json({
        message: "Log in successfully",
        accessToken: accessToken,
      });
    } else {
      res.status(401).json({
        message: "Wrong password",
      });
    }
  })
}

exports.updateById = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty",
    });
    return;
  }

  User.updateById(req.user.id, req.body, (err, user) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Errors occur when update user information",
      });
      return;
    }

    res.send({
      message: "User's information has been updated"
    })
  })
}
