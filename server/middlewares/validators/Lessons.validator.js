const { body } = require("express-validator");

const createLessonScheme = [
  body("name")
    .exists()
    .withMessage("Name is required")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Name must be not empty"),

  body("is_free").optional().isBoolean().withMessage("is_free must be boolean"),

  body("is_published")
    .optional()
    .isBoolean()
    .withMessage("is_published must be boolean"),
];

const updateLessonScheme = [
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Name must be not empty"),

  body("is_free").optional().isBoolean().withMessage("is_free must be boolean"),

  body("is_published")
    .optional()
    .isBoolean()
    .withMessage("is_published must be boolean"),
];
module.exports = { createLessonScheme, updateLessonScheme };
