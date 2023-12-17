const { body } = require("express-validator");

const createFinancialAidScheme = [
  body("essay").exists().withMessage("Must provide essay").trim(),
  body("amount")
    .exists()
    .withMessage("Must provide amount of money")
    .isFloat({ min: 0 })
    .withMessage("Amount of money must be a non-negative float"),
];

const updateStatusFinancialAidScheme = [
  body("status")
    .exists()
    .withMessage("Must provide status")
    .trim()
    .isIn(["PASSED", "DENIED"])
    .withMessage("Must provide valid status"),
];

module.exports = {
  createFinancialAidScheme,
  updateStatusFinancialAidScheme,
};
