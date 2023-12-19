const express = require("express");
const router = express.Router({ mergeParams: true });
const teachCourseController = require("../controllers/TeachCourses.controller");
const { validateToken } = require("../middlewares/Auth.middleware");

const {
  validateCourseAccessPermission,
} = require("../middlewares/Courses.middleware");

const {
  addTutorToCourseScheme,
  updateTutorProfitRateScheme,
} = require("../middlewares/validators/TeachCourses.validator");

router.get("/", teachCourseController.getCourseTutorList);

router.post(
  "/:tutor_id",
  [validateToken, validateCourseAccessPermission, addTutorToCourseScheme],
  teachCourseController.addTutorToCourse,
);
router.patch(
  "/:tutor_id",
  [validateToken, validateCourseAccessPermission, updateTutorProfitRateScheme],
  teachCourseController.updateTutorProfitRate,
);
router.delete(
  "/:tutor_id",
  [validateToken, validateCourseAccessPermission],
  teachCourseController.deleteTutorFromCourse,
);

module.exports = router;
