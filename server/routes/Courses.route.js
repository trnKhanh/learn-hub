const coursesController = require("../controllers/Courses.controller");
const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/Auth.middleware");
const {
  validateCourseCreatePermission,
  validateCourseModifyPermission,
} = require("../middlewares/Courses.middleware");
const { validateStudent } = require("../middlewares/Students.middleware");
router.get("/", coursesController.getAllCourses);

router.get("/:id", coursesController.getCourse);

router.post(
  "/",
  [validateToken, validateCourseCreatePermission],
  coursesController.createCourse,
);

router.patch(
  "/:id",
  [validateToken, validateCourseModifyPermission],
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
