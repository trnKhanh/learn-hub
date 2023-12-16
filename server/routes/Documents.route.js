const express = require("express");
const router = express.Router({ mergeParams: true });

// Controller
const DocumentsController = require("../controllers/Documents.controller");

// Middleware
const { validateToken } = require("../middlewares/Auth.middleware");

const {
  getCourse,
  validateLessonGetPermission,
  validateLessonChangePermission,
} = require("../middlewares/Lessons.middleware");

const { getLesson } = require("../middlewares/Documents.middleware");
const {
  createDocumentsScheme,
} = require("../middlewares/validators/Documents.validator");

//----------------------------------------

// create
router.post(
  "/",
  validateToken,
  getCourse,
  getLesson,
  validateLessonChangePermission,
  createDocumentsScheme,
  DocumentsController.create
);

// get
router.get("/", [getCourse, getLesson], DocumentsController.getAllDocuments);

router.get(
  "/:document_id",
  validateToken,
  getCourse,
  getLesson,
  validateLessonGetPermission,
  DocumentsController.getDocumentById
);

module.exports = router;
