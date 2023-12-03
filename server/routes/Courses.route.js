const coursesController = require("../controllers/Courses.controller");
const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/Auth.middleware");
const {
  validateCourseCreatePermission,
  validateCourseOwnership,
} = require("../middlewares/Courses.middleware");

router.post(
  "/",
  [validateToken, validateCourseCreatePermission],
  coursesController.create,
);

router.put(
  "/",
  [validateToken, validateCourseOwnership],
  coursesController.update,
);

module.exports = router;
