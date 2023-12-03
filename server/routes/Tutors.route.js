const tutorsController = require("../controllers/Tutors.controller");
const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/Auth.middleware");
const {
  validateTutorCreatePermission,
} = require("../middlewares/Tutor.middleware");

router.post(
  "/",
  [validateToken, validateTutorCreatePermission],
  tutorsController.create,
);

module.exports = router
