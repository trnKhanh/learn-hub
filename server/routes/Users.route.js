const usersController = require("../controllers/Users.controller");
const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/Auth.middleware");

const shoppingCartsRouter = require("./ShoppingCarts.route");
router.use("/cart", shoppingCartsRouter);

router.get("/", usersController.getAllUsers);

router.get("/:id", usersController.getUser);

router.patch("/", [validateToken], usersController.updateUserById);

router.delete("/", [validateToken], usersController.deleteUserById);


module.exports = router;
