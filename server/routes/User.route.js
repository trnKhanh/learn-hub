const userController = require("../controllers/User.controller.js");
const express = require("express");
const router = express.Router();

router.post("/signup", userController.signup)

router.post("/login", userController.login)

module.exports = router