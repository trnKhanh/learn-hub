const studentsController = require("../controllers/Students.controller");
const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/Auth.middleware");
const {
  validateStudentAccessPermission,
} = require("../middlewares/Students.middleware");

router.get("/", studentsController.getAllStudents);

router.get("/:id", studentsController.getStudent);

router.post("/", [validateToken], studentsController.createStudent);

router.patch(
  "/:id",
  [validateToken, validateStudentAccessPermission],
  studentsController.updateStudentById,
);

router.delete(
  "/:id",
  [validateToken, validateStudentAccessPermission],
  studentsController.deleteStudentById,
);

module.exports = router;
