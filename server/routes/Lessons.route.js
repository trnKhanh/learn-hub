const express = require("express");
const router = express.Router({ mergeParams: true });

// Controller
const LessonsController = require("../controllers/Lessons.controller");

// Middle ware
const { validateToken } = require("../middlewares/Auth.middleware");
const {
  validateLessonChangePermission,
  getCourse,
} = require("../middlewares/Lessons.middleware");
const {
  createLessonScheme,
} = require("../middlewares/validators/Lessons.validator");

// ----------------------------------------
// get all lesson
router.get("/", [getCourse], LessonsController.getAllLessons);

// get lesson by id
router.get(
  "/:lesson_id",
  [getCourse],
  LessonsController.getLessonWithDocumentAndExam
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
// router.patch(
//   "/:lesson_id",
//   [
//     validateToken,
//     getCourse,
//     validateLessonChangePermission,
//     updateLessonScheme,
//   ],
//   LessonsController.update
// );
module.exports = router;
