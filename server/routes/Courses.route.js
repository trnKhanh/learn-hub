const coursesController = require("../controllers/Courses.controller");
const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/Auth.middleware");

const {
  validateCourseCreatePermission,
  validateCourseAccessPermission,
} = require("../middlewares/Courses.middleware");
const { validateStudent } = require("../middlewares/Students.middleware");

const {
  createCourseScheme,
  updateCourseScheme,
  searchCourseScheme,
} = require("../middlewares/validators/Courses.validator");

const multer = require("multer");
const upload = multer({
  dest: __dirname + "/../uploads/courses/profile_pictures",
});

router.get("/", coursesController.getAllCourses);
router.get("/search", [searchCourseScheme], coursesController.searchCourse);
router.get("/:course_id", coursesController.getCourse);

router.post(
  "/",
  [
    validateToken,
    validateCourseCreatePermission,
    createCourseScheme,
    upload.single("profile_picture"),
  ],
  coursesController.createCourse,
);

router.patch(
  "/:course_id",
  [
    validateToken,
    validateCourseAccessPermission,
    updateCourseScheme,
    upload.single("profile_picture"),
  ],
  coursesController.updateCourse,
);

router.delete(
  "/:course_id",
  [validateToken, validateCourseAccessPermission],
  coursesController.deleteCourse,
);

router.post(
  "/:course_id/register",
  [validateToken, validateStudent],
  coursesController.registerStudent,
);

router.get(
  "/:course_id/progress",
  [validateToken, validateStudent],
  coursesController.getCourseProgress,
);

const financialAidsRouter = require("./FinancialAids.route");
router.use("/:course_id/financialAids/", financialAidsRouter);

module.exports = router;
