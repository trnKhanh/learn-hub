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
  validateLessonDeletePermission,
} = require("../middlewares/Lessons.middleware");

const { getLesson } = require("../middlewares/Documents.middleware");
const {
  createDocumentsScheme,
  updateDocumentsScheme,
} = require("../middlewares/validators/Documents.validator");

const multer = require("multer");
const upload = multer({
  dest: "./uploads/lessons/documents/",
});
//----------------------------------------

// create
router.post(
  "/",
  [
    validateToken,
    getCourse,
    getLesson,
    validateLessonChangePermission,
    createDocumentsScheme,
    upload.single("file"),
  ],
  DocumentsController.create
);

// get
router.get(
  "/",
  [validateToken, getCourse, getLesson, validateLessonGetPermission],
  DocumentsController.getAllDocuments
);

router.get(
  "/:document_id",
  [validateToken, getCourse, getLesson, validateLessonGetPermission],
  DocumentsController.getDocumentById
);

// update
router.patch(
  "/:document_id",
  [
    validateToken,
    getCourse,
    getLesson,
    validateLessonChangePermission,
    updateDocumentsScheme,
    upload.single("file"),
  ],
  DocumentsController.update
);

// delete
router.delete(
  "/:document_id",
  [validateToken, getCourse, getLesson, validateLessonDeletePermission],
  DocumentsController.delete
);

module.exports = router;
