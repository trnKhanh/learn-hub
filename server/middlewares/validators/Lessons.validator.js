const { body } = require("express-validator");

const createLessonScheme = [
  body("name")
    .exists()
    .withMessage("Name is required")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Name must be not empty"),

  body("isFree").optional().isBoolean().withMessage("isFree must be boolean"),

  body("isPublished")
    .optional()
    .isBoolean()
    .withMessage("isPublished must be boolean"),
];

const updateLessonScheme = [
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Name must be not empty"),

  body("isFree").optional().isBoolean().withMessage("isFree must be boolean"),

  body("isPublished")
    .optional()
    .isBoolean()
    .withMessage("isPublished must be boolean"),
];
module.exports = { createLessonScheme, updateLessonScheme };
