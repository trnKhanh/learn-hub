const usersController = require("../controllers/Users.controller");
const express = require("express");
const router = express.Router();
const authMiddleWare = require("../middlewares/Auth.middleware");

router.post("/signup", usersController.signup);

router.post("/login", usersController.login);

router.put("/", authMiddleWare, usersController.updateById);

module.exports = router;
