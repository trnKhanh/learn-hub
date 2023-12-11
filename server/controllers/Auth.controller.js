const User = require("../models/Users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const { validationResult, matchedData } = require("express-validator");

const saltRounds = 10;

// Create new user
const signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).send(errors);
    return;
  }
  const data = matchedData(req);

  let password = data.password;

  // Use bcrypt to hash the password
  let hashedPassword = await bcrypt.hash(password, saltRounds);
  data.password = hashedPassword;

  const newUser = new User({
    password: hashedPassword,
    ...data,
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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).send(errors);
    return;
  }
  const data = matchedData(req);

  let username = data.username;
  let password = data.password;

  try {
    // Find user with given username
    const user = await User.findOne({ username: username }, 1);
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
          id: user.id,
        },
        privateKey,
        { algorithm: "RS256", expiresIn: "7d" },
      );

      // Send access token to client
      res.json({
        message: "Log in successfully",
        username: user.username,
        user_id: user.id,
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
