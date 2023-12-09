const coursesController = require("../controllers/Courses.controller");
const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/Auth.middleware");
const {
  validateCourseCreatePermission,
  validateCourseModifyPermission,
} = require("../middlewares/Courses.middleware");
const { validateStudent } = require("../middlewares/Students.middleware");
const {
  createCourseScheme,
  updateCourseScheme,
} = require("../middlewares/validators/Courses.validator");

router.get("/", coursesController.getAllCourses);

router.get("/:id", coursesController.getCourse);

router.post(
  "/",
  [validateToken, validateCourseCreatePermission, createCourseScheme],
  coursesController.createCourse,
);

router.patch(
  "/:id",
  [validateToken, validateCourseModifyPermission, updateCourseScheme],
  coursesController.updateCourse,
);

router.delete(
  "/:id",
  [validateToken, validateCourseModifyPermission],
  coursesController.deleteCourse,
);

router.post(
  "/:id/register",
  [validateToken, validateStudent],
  coursesController.registerStudent,
);

router.get(
  "/:id/progress",
  [validateToken, validateStudent],
  coursesController.getCourseProgress,
);

module.exports = router;
