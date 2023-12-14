const express = require("express");
const router = express.Router({ mergeParams: true });
const LessonsController = require("../controllers/Lessons.controller");

const { validateToken } = require("../middlewares/Auth.middleware");

// get all lesson
router.get("/", [LessonsController.getCourse], LessonsController.getAllLessons);

// get lesson by id
router.get(
  "/:lesson_id",
  [LessonsController.getCourse],
  LessonsController.getLesson
);

module.exports = router;
