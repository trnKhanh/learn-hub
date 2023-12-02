const coursesController = require("../controllers/Courses.controller");
const express = require("express");
const router = express.Router();
const authMiddleWare = require("../middlewares/Auth.middleware");

router.post("/", authMiddleWare, coursesController.create);

router.put("/", authMiddleWare, coursesController.update);

module.exports = router;
