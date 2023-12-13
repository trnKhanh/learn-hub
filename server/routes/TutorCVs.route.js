const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/Auth.middleware");
const {
  validateTutorAccessPermission,
  validateTutor,
} = require("../middlewares/Tutors.middleware");
const tutorCVsController = require("../controllers/TutorCVs.controller");
const {
  updateTutorCVScheme,
} = require("../middlewares/validators/TutorCVs.validator");

router.put("/", [validateToken, validateTutor], tutorCVsController.putTutorCV);

router.delete(
  "/",
  [validateToken, validateTutor],
  tutorCVsController.deleteTutorCV,
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

router.get(
  "/download/:id",
  tutorCVsController.downloadTutorCV,
);

module.exports = router;
