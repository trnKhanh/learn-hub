const authController = require("../controllers/Auth.controller");
const express = require("express");
const router = express.Router();
const authMiddleWare = require("../middlewares/Auth.middleware");

router.post("/signup", authController.signup);

router.post("/login", authController.login);

module.exports = router;
