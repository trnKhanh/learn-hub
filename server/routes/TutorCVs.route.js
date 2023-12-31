const express = require("express");
const router = express.Router();
const path = require("path");
const { validateToken } = require("../middlewares/Auth.middleware");
const {
  validateTutorAccessPermission,
  validateTutor,
} = require("../middlewares/Tutors.middleware");
const tutorCVsController = require("../controllers/TutorCVs.controller");
const {
  updateTutorCVScheme,
} = require("../middlewares/validators/TutorCVs.validator");

const fs = require("fs");
const multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const path = "./uploads/tutors/cvs";
    fs.mkdirSync(path, { recursive: true });
    cb(null, "./uploads/tutors/cvs");
  },
  filename: function (req, file, cb) {
    cb(null, req.user.id + ".zip"); //Appending .jpg
  },
});
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== ".rar" && ext !== ".zip" && ext !== ".7zip") {
      callback(null, false);
    } else {
      callback(null, true);
    }
  },
});

router.put(
  "/",
  [validateToken, validateTutor, upload.single("cv")],
  tutorCVsController.putTutorCV,
);

router.delete(
  "/",
  [validateToken, validateTutor],
  tutorCVsController.deleteTutorCV,
);

router.get(
  "/mine",
  [validateToken, validateTutor],
  tutorCVsController.getTutorCV,
);

// Admin access
router.get(
  "/",
  [validateToken, validateTutorAccessPermission],
  tutorCVsController.getAllTutorCVs,
);

router.get(
  "/:id",
  [validateToken, validateTutorAccessPermission],
  tutorCVsController.getTutorCV,
);

router.patch(
  "/:id",
  [validateToken, validateTutorAccessPermission, updateTutorCVScheme],
  tutorCVsController.updateTutorCVStatus,
);

router.get("/download/:id", tutorCVsController.downloadTutorCV);

module.exports = router;
