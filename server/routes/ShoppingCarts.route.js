const shoppingCartsController = require("../controllers/ShoppingCarts.controller");
const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/Auth.middleware");
const { validateStudent } = require("../middlewares/Students.middleware");

router.get(
  "/",
  [validateToken, validateStudent],
  shoppingCartsController.getCart,
);

router.post(
  "/:id",
  [validateToken, validateStudent],
  shoppingCartsController.addCourseToCart,
);

router.delete(
  "/:id",
  [validateToken, validateStudent],
  shoppingCartsController.removeCourseFromCart,
);
router.delete(
  "/",
  [validateToken, validateStudent],
  shoppingCartsController.removeAllCourseFromCart,
);

module.exports = router;
