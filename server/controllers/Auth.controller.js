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

  const newUser = new User({
    username: username,
    password: hashedPassword,
  });

  // Create new user with hashed password
  try {
    const user = await User.create(newUser);
    res.status(201);
    await login(req, res);
  } catch (err) {
    console.log(err);
    if (err.code == "ER_DUP_ENTRY") {
      res.status(409).json({
        message: "User has already existed",
      });
      return;
    }
    res.status(500).json({
      message: "Errors occur when creating new user",
    });
  }
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

  try {
    // Find user with given username
    const user = await User.findOne({ username: username });
    if (!user) {
      res.status(404).json({
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
          id: user.uuid,
        },
        privateKey,
        { algorithm: "RS256", expiresIn: "1d" },
      );

      // Send access token to client
      res.json({
        message: "Log in successfully",
        username: user.username,
        user_id: user.uuid,
        accessToken: accessToken,
      });
    } else {
      res.status(401).json({
        message: "Wrong password",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Errors occur when finding user",
    });
  }
};

module.exports = {
  signup,
  login,
};
