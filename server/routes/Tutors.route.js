const tutorsController = require("../controllers/Tutors.controller");
const express = require("express");
const router = express.Router();
const path = require("path");
const { validateToken } = require("../middlewares/Auth.middleware");
const {
  validateTutorAccessPermission,
  validateTutor,
} = require("../middlewares/Tutors.middleware");
const {
  updateTutorScheme,
} = require("../middlewares/validators/Tutors.validator");

const multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "/../uploads/tutors/cvs");
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

router.get("/", tutorsController.getAllTutors);

router.get("/mine", [validateToken, validateTutor], tutorsController.getTutor);

router.get("/:id", tutorsController.getTutor);

router.post(
  "/",
  [validateToken, upload.single("cv")],
  tutorsController.createTutor,
);

router.patch(
  "/:id",
  [validateToken, validateTutorAccessPermission, updateTutorScheme],
  tutorsController.updateTutorById,
);

router.delete(
  "/:id",
  [validateToken, validateTutorAccessPermission],
  tutorsController.deleteTutorById,
);

const tutorCVsRouter = require("./TutorCVs.route");
router.use("/cvs", tutorCVsRouter);

module.exports = router;
