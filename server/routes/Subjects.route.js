const subjectController = require("../controllers/Subjects.controller");
const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/Auth.middleware");
const {validateSubjectsAccessPermission} = require("../middlewares/Subjects.middleware");

const {
    createSubjectScheme,
    updateSubjectScheme,
} = require("../middlewares/validators/Subjects.validator");

router.get("/", subjectController.getAllSubjects);

router.get("/:id" , subjectController.getSubjectById);

// router.get("/course-:course_id", subjectController.getSubjectsOfCourseId);

router.post(
  "/",
  [validateToken, validateSubjectsAccessPermission, createSubjectScheme],
  subjectController.createSubject,
);

router.patch(
  "/:id",
  [validateToken, validateSubjectsAccessPermission, updateSubjectScheme],
  subjectController.updateSubjectById,
);

router.delete(
  "/:id",
  [validateToken, validateSubjectsAccessPermission],
  subjectController.deleteSubjectById,
);

module.exports = router;
