const { body } = require("express-validator");

const createPaymentInformationScheme = [
  body("card")
    .exists()
    .withMessage("Must provide card number")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Card number cannot be empty"),
  body("expire_date")
    .exists()
    .withMessage("Must provide expire date")
    .bail()
    .trim()
    .isISO8601()
    .withMessage("Date format must be yyyy-mm-dd"),
];

module.exports = {
  createPaymentInformationScheme,
};
