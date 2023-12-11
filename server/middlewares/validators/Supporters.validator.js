const { body } = require("express-validator");

const createSupporterScheme = [
  body("id")
    .exists()
    .withMessage("Must provide user id of supporter"),
  body("role")
    .exists()
    .withMessage("Must provide supporter's role")
    .trim()
    .isIn(["TECHNICAL", "SOCIAL"])
    .withMessage("Invalid supporter's role"),
];

const updateSupporterScheme = [
  body("role")
    .optional()
    .trim()
    .isIn(["TECHNICAL", "SOCIAL"])
    .withMessage("Invalid supporter's role"),
];

module.exports = { createSupporterScheme, updateSupporterScheme };
