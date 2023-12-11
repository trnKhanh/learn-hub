const { body } = require("express-validator");

const updateTutorScheme = [
  body("admin_id").optional(),
  body("verified")
    .optional()
    .isIn([0, 1])
    .withMessage("Invalid verified status"),
  body("profit")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Invalid profit value"),
];

module.exports = { updateTutorScheme };
