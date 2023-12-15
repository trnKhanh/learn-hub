const User = require("../models/Users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const saltRounds = 10;

// Create new user
const signup = async (req, res) => {
  // if request is invalid (empty body)
  if (!req.body || !req.body.username || !req.body.password) {
    res.status(400).send({
      message: "Invalid content",
    });
    return;
  }

  let username = req.body.username;
  let password = req.body.password;
  // Use bcrypt to hash the password
  let hashedPassword = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username: username,
    password: hashedPassword,
  });

  // Create new user with hashed password
  User.create(user, (err, user) => {
    if (err) {
      if (err.code == "ER_DUP_ENTRY") {
        res.status(409).json({
          message: "User has already existed",
        });
        return;
      }
      res.status(500).json({
        message: "Errors occur when creating new user",
      });
    } else {
      res.cookie('accessToken', token, { httpOnly: true });
      res.status(201);
      login(req, res);
    }
  });
};

// Login user
const login = async (req, res) => {
  // if request is invalid (empty body)
  if (!req.body || !req.body.username || !req.body.password) {
    res.status(400).send({
      message: "Invalid content",
    });
    return;
  }

  let username = req.body.username;
  let password = req.body.password;

  // Find user with given username
  User.findOne({ username: username }, async (err, user) => {
    if (err) {
      res.status(500).send({
        message: "Errors occur when finding user",
      });
      return;
    }

    if (!user) {
      res.status(401).json({
        message: "User do not exists",
      });
      return;
    }
    // Check password
    let matched = await bcrypt.compare(password, user.password);
    if (matched) {
      // Create new access token
      const privateKey = fs.readFileSync(path.join(__dirname, "../jwt.key"));
      const accessToken = jwt.sign(
        {
          username: user.username,
          id: user.id,
        },
        privateKey,
        { algorithm: "RS256", expiresIn: "1d" },
      );

      // Send access token to client
      res.json({
        message: "Log in successfully",
        accessToken: accessToken,
      });
    } else {
      res.status(401).json({
        message: "Wrong password",
      });
    }
  });
};

module.exports = {
  signup,
  login,
};
