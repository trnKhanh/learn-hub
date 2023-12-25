const subjectControllers = require("../controllers/Subjects.controller");
const express = require("express");
const router = express.Router();

router.get("/", subjectControllers.getAllSubjects);

module.exports = router;
