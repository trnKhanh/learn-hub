const tutorsController = require("../controllers/Tutors.controller");
const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/Auth.middleware");
const {
  validateTutorAccessPermission,
} = require("../middlewares/Tutors.middleware");
const {
  updateTutorScheme,
} = require("../middlewares/validators/Tutors.validator");

router.get("/", tutorsController.getAllTutors);

router.get("/:id", tutorsController.getTutor);

router.post("/", [validateToken], tutorsController.createTutor);

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
