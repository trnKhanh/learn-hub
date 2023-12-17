const { body } = require("express-validator");

const createPaymentScheme = [
  body("discounted")
    .optional()
    .isFloat({ min: 0, max: 1 })
    .withMessage("Discounted value must be a float in [0,1]"),
];

module.exports = {
  createPaymentScheme,
};
