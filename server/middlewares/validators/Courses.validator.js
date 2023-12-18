const { body, query } = require("express-validator");

const createCourseScheme = [
  body("name")
    .exists()
    .withMessage("Must provide course's name")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Course's name cannot be empty"),
  body("description")
    .exists()
    .withMessage("Must provide course's description")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Course's description cannot be empty"),
  body("difficulty")
    .exists()
    .withMessage("Must provide course's difficulty")
    .bail()
    .trim()
    .isIn(["BEGINNER", "INTERMEDIATE", "ADVANCED"])
    .withMessage("Invalid course's difficulty"),
  body("duration")
    .exists()
    .withMessage("Must provide course's duration in days")
    .bail()
    .isInt({ min: 0 })
    .withMessage("Course's duration must be presented in days"),
  body("owner_id").optional(),
  body("price")
    .exists()
    .withMessage("Must provide course's price")
    .isFloat({ min: 0 })
    .withMessage("Course's price must be positive float"),
  body("discount")
    .optional()
    .isFloat({ min: 0, max: 1 })
    .withMessage("Course's price must be float in [0,1]"),
];

const updateCourseScheme = [
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Course's name cannot be empty"),
  body("description")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Course's description cannot be empty"),
  body("difficulty")
    .optional()
    .trim()
    .isIn(["BEGINNER", "INTERMEDIATE", "ADVANCED"])
    .withMessage("Invalid course's difficulty"),
  body("duration")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Course's duration must be presented in days"),
  body("owner_id").optional(),
  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Course's price must be positive float"),
  body("discount")
    .optional()
    .isFloat({ min: 0, max: 1 })
    .withMessage("Course's price must be float in [0,1]"),
];

const searchCourseScheme = [
  query("name")
    .optional()
    .isString()
    .withMessage("Course name must be a string"),
  query("priceMin")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive float"),
  query("priceMax")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive float"),
  query("subjects").optional(),
  query("languages").optional(),
  query("difficulties").optional(),
];

module.exports = {
  createCourseScheme,
  updateCourseScheme,
  searchCourseScheme,
};
