const { body } = require("express-validator");

const updateTutorCVScheme = [
  body("status")
    .optional()
    .isIn(["REFUSED", "PASSED"])
    .withMessage("Invalid status"),
];

module.exports = { updateTutorCVScheme };
