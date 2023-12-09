const { body } = require("express-validator");

const createAdminSchema = [
  body("id").exists().withMessage("Must specify admin id"),
  body("courses_access").optional().isIn([0, 1]),
  body("students_access").optional().isIn([0, 1]),
  body("tutors_access").optional().isIn([0, 1]),
  body("supporters_accesss").optional().isIn([0, 1]),
];

const updateAdminSchema = [
  body("courses_access").optional().isIn([0, 1]),
  body("students_access").optional().isIn([0, 1]),
  body("tutors_access").optional().isIn([0, 1]),
  body("supporters_accesss").optional().isIn([0, 1]),
];

module.exports = {
  createAdminSchema,
  updateAdminSchema,
};
