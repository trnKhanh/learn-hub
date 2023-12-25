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

const path = require("path");
const multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(
      null,
      `./uploads/courses/${req.params.course_id}/lessons/${req.params.lesson_id}/`,
    );
  },
  filename: function (req, file, cb) {
    cb(null, "video.mp4"); //Appending .jpg
  },
});
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== ".mp4") {
      callback(null, false);
    } else {
      callback(null, true);
    }
  },
});

// ----------------------------------------
// get all lesson
router.get("/", [getCourse], LessonsController.getAllPublishedLessons);

router.get(
  "/edit",
  [validateToken, getCourse, validateLessonChangePermission],
  LessonsController.getAllLessons,
);

// get lesson by id
router.get(
  "/:lesson_id/video",
  [validateToken, getCourse, validateLessonGetPermission],
  LessonsController.streamVideo,
);
router.get(
  "/:lesson_id",
  [validateToken, getCourse, validateLessonGetPermission],
  LessonsController.getLessonWithDocumentAndExamById,
);

// create lesson
router.post(
  "/",
  [
    validateToken,
    getCourse,
    validateLessonChangePermission,
    createLessonScheme,
    upload.single("video"),
  ],
  LessonsController.create,
);

// update lesson
router.patch(
  "/:lesson_id",
  [
    validateToken,
    getCourse,
    validateLessonChangePermission,
    updateLessonScheme,
    upload.single("video"),
  ],
  LessonsController.update,
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
  LessonsController.delete,
);

const documentsRouter = require("./Documents.route");
router.use("/:lesson_id/documents/", documentsRouter);

const examsRouter = require("./Exams.route");
router.use("/:lesson_id/exams/", examsRouter);

module.exports = router;
