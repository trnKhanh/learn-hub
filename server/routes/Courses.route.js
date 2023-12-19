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
  addTutorToCourseScheme,
  updateTutorProfitRateScheme,
} = require("../middlewares/validators/Courses.validator");

const multer = require("multer");
const upload = multer({
  dest: __dirname + "/../uploads/courses/profile_pictures",
});

router.get("/", coursesController.getAllCourses);

router.get("/:course_id", coursesController.getCourse);

router.get("/:course_id/lessons", lessonsController.getAllLessons);

router.get(
  "/:course_id/documents",
  documentsController.getAllDocumentsOfCourse,
);

router.get("/:course_id/subjects", subjectsController.getSubjectsOfCourseId);

router.get("/search", [searchCourseScheme], coursesController.searchCourse);

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

router.get("/:course_id/tutors", coursesController.getCourseTutorList);

router.post(
  "/:course_id/tutors/:tutor_id",
  [validateToken, validateCourseAccessPermission, addTutorToCourseScheme],
  coursesController.addTutorToCourse,
);
router.patch(
  "/:course_id/tutors/:tutor_id",
  [validateToken, validateCourseAccessPermission, updateTutorProfitRateScheme],
  coursesController.updateTutorProfitRate,
);
router.delete(
  "/:course_id/tutors/:tutor_id",
  [validateToken, validateCourseAccessPermission],
  coursesController.deleteTutorFromCourse,
);

module.exports = router;
