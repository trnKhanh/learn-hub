const { body } = require("express-validator");

const createDocumentsScheme = [
  body("name")
    .exists()
    .withMessage("Name is required")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Name must be not empty"),
];

module.exports = {
  createDocumentsScheme,
};
