const usersController = require("../controllers/Users.controller");
const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/Auth.middleware");

router.patch("/", [validateToken], usersController.updateUser);

router.delete("/", [validateToken], usersController.deleteUser);

module.exports = router;
