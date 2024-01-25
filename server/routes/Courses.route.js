const coursesController = require("../controllers/Courses.controller");
const lessonsController = require("../controllers/Lessons.controller");
const documentsController = require("../controllers/Documents.controller");
const subjectsController = require("../controllers/Subjects.controller");
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

router.get("/:course_id/subjects", subjectsController.getSubjectsOfCourseId);

router.get(
  "/:course_id/progress",
  [validateToken, validateStudent],
  coursesController.getCourseProgress,
);

router.get("/:course_id", coursesController.getCourse);

router.get("/tutor/:tutor_id", coursesController.getCoursesOfTutor);


router.post(
  "/",
  [
    validateToken,
    validateCourseCreatePermission,
    createCourseScheme,
  ],
  coursesController.createCourse,
);

router.patch(
  "/:course_id",
  [
    validateToken,
    validateCourseAccessPermission,
    updateCourseScheme,
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

const financialAidsRouter = require("./FinancialAids.route");
router.use("/:course_id/financialAids/", financialAidsRouter);

const teachCoursesRouter = require("./TeachCourses.route");
router.use("/:course_id/tutors/", teachCoursesRouter);

const lessonsRouter = require("./Lessons.route");
router.use("/:course_id/lessons/", lessonsRouter);

module.exports = router;
