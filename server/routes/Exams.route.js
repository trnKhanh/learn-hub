const express = require("express");

// Controller
const ExamsController = require("../controllers/Exams.controller");

// middleware
const {
  getCourse,
  validateLessonGetPermission,
  validateLessonChangePermission,
  validateLessonDeletePermission,
} = require("../middlewares/Lessons.middleware");
const { getLesson } = require("../middlewares/Documents.middleware");
const { validateToken } = require("../middlewares/Auth.middleware");
const {
  createExamsScheme,
  updateExamsScheme,
} = require("../middlewares/validators/Exams.validator");

const router = express.Router({ mergeParams: true });

module.exports = router;

router.post(
  "/",
  [
    validateToken,
    getCourse,
    getLesson,
    validateLessonChangePermission,
    createExamsScheme,
  ],
  ExamsController.create
);

router.get(
  "/",
  [validateToken, getCourse, getLesson, validateLessonGetPermission],
  ExamsController.getAll
);

router.get("/:exam_id", ExamsController.getExamById);

router.patch(
  "/:exam_id",
  [
    validateToken,
    getCourse,
    getLesson,
    validateLessonChangePermission,
    updateExamsScheme,
  ],
  ExamsController.update
);

router.delete(
  "/:exam_id",
  [validateToken, getCourse, getLesson, validateLessonDeletePermission],
  ExamsController.delete
);
