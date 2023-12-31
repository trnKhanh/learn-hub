const studentsController = require("../controllers/Students.controller");
const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/Auth.middleware");
const {
  validateStudentAccessPermission, validateStudent,
} = require("../middlewares/Students.middleware");
const {
  updateStudentScheme,
} = require("../middlewares/validators/Students.validator");

router.get("/", studentsController.getAllStudents);

router.get(
  "/courses",
  [validateToken, validateStudent],
  studentsController.getCourses,
);

router.get("/:id", studentsController.getStudent);


router.post("/", [validateToken], studentsController.createStudent);

router.patch(
  "/:id",
  [validateToken, validateStudentAccessPermission, updateStudentScheme],
  studentsController.updateStudentById,
);

router.delete(
  "/:id",
  [validateToken, validateStudentAccessPermission],
  studentsController.deleteStudentById,
);

module.exports = router;
