const { body } = require("express-validator");

const createExamsScheme = [
  body("name")
    .exists()
    .withMessage("Name is required")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Name must not be empty")
    .bail(),

  // the value in 0 -> 1
  body("percentage")
    .exists()
    .withMessage("Percentage is required")
    .bail()
    .isFloat({ min: 0, max: 1 })
    .withMessage("Percentage must be a number from 0 -> 1"),
];

const updateExamsScheme = [
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Name must not be empty")
    .bail(),

  // the value in 0 -> 1
  body("percentage")
    .optional()
    .isFloat({ min: 0, max: 1 })
    .withMessage("Percentage must be a number from 0 -> 1"),
];

module.exports = { createExamsScheme, updateExamsScheme };
