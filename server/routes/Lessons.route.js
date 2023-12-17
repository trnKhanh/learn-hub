const express = require("express");
const router = express.Router({ mergeParams: true });

// Controller
const LessonsController = require("../controllers/Lessons.controller");

// Middle ware
const { validateToken } = require("../middlewares/Auth.middleware");
const {
  validateLessonChangePermission,
  getCourse,
  validateLessonDeletePermission,
  validateLessonGetPermission,
} = require("../middlewares/Lessons.middleware");
const {
  createLessonScheme,
  updateLessonScheme,
} = require("../middlewares/validators/Lessons.validator");
const Lesson = require("../models/Lessons.model");

// ----------------------------------------
// get all lesson
router.get("/", [getCourse], LessonsController.getAllLessons);

// get lesson by id
router.get(
  "/:lesson_id",
  [validateToken, getCourse, validateLessonGetPermission],
  LessonsController.getLessonWithDocumentAndExamById
);

// create lesson
router.post(
  "/",
  [
    validateToken,
    getCourse,
    validateLessonChangePermission,
    createLessonScheme,
  ],
  LessonsController.create
);

// update lesson
router.patch(
  "/:lesson_id",
  [
    validateToken,
    getCourse,
    validateLessonChangePermission,
    updateLessonScheme,
  ],
  LessonsController.update
);

// delete lesson
// only creator or admin can delete lesson
router.delete(
  "/:lesson_id",
  [
    validateToken,
    getCourse,
    validateLessonDeletePermission,
    updateLessonScheme,
  ],
  LessonsController.delete
);
module.exports = router;
