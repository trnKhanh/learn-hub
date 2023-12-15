const authController = require("../controllers/Auth.controller");
const express = require("express");
const router = express.Router();
const authMiddleWare = require("../middlewares/Auth.middleware");
const {
  signupScheme,
  loginScheme,
} = require("../middlewares/validators/Auth.validator");

router.post("/signup", signupScheme, authController.signup);

router.post("/login", loginScheme, authController.login);

module.exports = router;
