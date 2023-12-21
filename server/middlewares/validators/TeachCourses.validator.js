const { body } = require("express-validator");
const addTutorToCourseScheme = [
  body("profit_rate")
    .exists()
    .exists()
    .withMessage("Must provide profit rate")
    .bail()
    .isFloat({ min: 0, max: 1 })
    .withMessage("Profit rate must be float in [0,1]"),
];
const updateTutorProfitRateScheme = [
  body("profit_rate")
    .exists()
    .exists()
    .withMessage("Must provide profit rate")
    .bail()
    .isFloat({ min: 0, max: 1 })
    .withMessage("Profit rate must be float in [0,1]"),
];

module.exports = {
  addTutorToCourseScheme,
  updateTutorProfitRateScheme,
};
