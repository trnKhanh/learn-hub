const usersController = require("../controllers/Users.controller");
const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/Auth.middleware");
const {
  updateUserScheme,
} = require("../middlewares/validators/Users.validator");

const shoppingCartsRouter = require("./ShoppingCarts.route");
router.use("/cart", shoppingCartsRouter);

const paymentInformationsRouter = require("./PaymentInformations.route");
router.use("/paymentInformations", paymentInformationsRouter);

const paymentsRouter = require("./Payments.route");
router.use("/payments", paymentsRouter);

router.get("/", usersController.getAllUsers);

router.get("/:id", usersController.getUser);

router.patch(
  "/",
  [validateToken, updateUserScheme],
  usersController.updateUserById,
);

router.delete("/", [validateToken], usersController.deleteUserById);

module.exports = router;
