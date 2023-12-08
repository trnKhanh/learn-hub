const shoppingCartsController = require("../controllers/ShoppingCarts.controller");
const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/Auth.middleware");

router.get("/", validateToken, shoppingCartsController.getCart);

router.post(
  "/:id",
  [validateToken],
  shoppingCartsController.addCourseToCart,
);

router.delete(
  "/:id",
  [validateToken],
  shoppingCartsController.removeCourseFromCart,
);
router.delete(
  "/",
  [validateToken],
  shoppingCartsController.removeAllCourseFromCart,
);

module.exports = router;
