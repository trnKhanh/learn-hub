const userController = require("../controllers/User.controller");
const express = require("express");
const router = express.Router();
const authMiddleWare = require("../middlewares/Auth.middleware");

router.post("/signup", userController.signup)

router.post("/login", userController.login)

router.put("/", authMiddleWare, userController.updateById)

module.exports = router
