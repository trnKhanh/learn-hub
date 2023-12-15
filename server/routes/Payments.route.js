const paymentController = require("../controllers/Payments.controller");
const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/Auth.middleware");
const {
  validatePaymentAccessPermission,
} = require("../middlewares/Payments.middleware");

const {
  createPaymentScheme,
} = require("../middlewares/validators/Payments.validator");

router.post(
  "/",
  [validateToken, createPaymentScheme],
  paymentController.createPayment,
);

router.get("/", validateToken, paymentController.getAllPayments);

router.get(
  "/:id",
  [validateToken, validatePaymentAccessPermission],
  paymentController.getPaymentInfo,
);

module.exports = router;
