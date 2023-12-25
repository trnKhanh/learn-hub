const { body } = require("express-validator");

const createSupporterScheme = [
  body("username")
    .exists()
    .withMessage("Must provide username of supporter"),
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
