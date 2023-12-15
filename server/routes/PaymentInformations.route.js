const paymentInformationsController = require("../controllers/PaymentInformations.controller");
const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/Auth.middleware");

const {
  createPaymentInformationScheme,
} = require("../middlewares/validators/PaymentInformations.validator");

router.get(
  "/",
  validateToken,
  paymentInformationsController.getPaymentInformations,
);

router.post(
  "/",
  [validateToken, createPaymentInformationScheme],
  paymentInformationsController.createPaymentInformation,
);

router.delete(
  "/",
  [validateToken],
  paymentInformationsController.deletePaymentInformation,
);

module.exports = router;
