const { body } = require("express-validator");

const updateStudentScheme = [
  body("membership")
    .optional()
    .trim()
    .isIn(["SILVER", "GOLD", "PREMIUM"])
    .withMessage("Invalid membership"),
];

module.exports = {
  updateStudentScheme,
};
