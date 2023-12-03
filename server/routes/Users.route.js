const usersController = require("../controllers/Users.controller");
const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/Auth.middleware");

router.put("/", [validateToken], usersController.updateById);

module.exports = router;
