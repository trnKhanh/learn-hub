const { body } = require("express-validator");

const updateUserScheme = [
  body("full_name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Must provide a valid full name"),
  body("date_of_birth")
    .optional()
    .trim()
    .isISO8601()
    .withMessage("Date format must be yyyy-mm-dd")
    .toDate(),
  body("phone_number")
    .optional()
    .trim()
    .isMobilePhone("any")
    .withMessage("Must provide a valid phone number"),
  body("institue").optional().trim(),
  body("area_of_study").optional().trim(),
  body("biography").optional().trim(),
];

module.exports = {
  updateUserScheme,
};
