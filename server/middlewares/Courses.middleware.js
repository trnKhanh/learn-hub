const Course = require("../models/Courses.model");
const Tutor = require("../models/Tutors.model");

const validateCourseCreatePermission = async (req, res, next) => {
  Tutor.findOne({ id: req.user.id, verified: 1 }, (err, tutor) => {
    if (err) {
      res.status(500).json({
        message: "Errors occur when validate course create permission",
      });
    } else {
      if (!tutor) {
        res.status(401).json({
          message: "User has no permission to create new course",
        });
      } else {
        next();
      }
    }
  });
};

const validateCourseOwnership = async (req, res, next) => {
  if (!req.body || !req.body.id) {
    res.status(400).json({
      message: "Invalid content",
    });
    return;
  }
  Course.findOne({ id: req.body.id, owner: req.user.id }, (err, course) => {
    if (err) {
      res.status(500).json({
        message: "Errors occur when validate course ownership",
      });
    } else {
      if (!course) {
        res.status(401).json({
          message: "User is not the owner of the course",
        });
      } else {
        next();
      }
    }
  });
};

module.exports = {
  validateCourseOwnership,
  validateCourseCreatePermission,
};
