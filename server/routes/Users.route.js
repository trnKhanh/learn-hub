const usersController = require("../controllers/Users.controller");
const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/Auth.middleware");
const {
  updateUserScheme,
} = require("../middlewares/validators/Users.validator");

const multer = require("multer");
const upload = multer({
  dest: __dirname + "/../uploads/users/profile_pictures",
});

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
  [validateToken, updateUserScheme, upload.single("profile_picture")],
  usersController.updateUserById,
);

router.delete("/", [validateToken], usersController.deleteUserById);

module.exports = router;
