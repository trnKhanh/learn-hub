const Course = require("../models/Courses.model");
const Tutor = require("../models/Tutors.model");
const Admin = require("../models/Admins.model");

const validateCourseCreatePermission = async (req, res, next) => {
  try {
    const tutor = await Tutor.findOne({ id: req.user.id, verified: 1 });
    const admin = await Admin.findOne({ id: req.user.id, courses_access: 1 });
    if (!tutor && !admin) {
      res.status(401).json({
        message: "No permission to create courses",
      });
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Errors occur when validating create course permission",
    });
  }
};

const validateCourseAccessPermission = async (req, res, next) => {
  try {
    const course = await Course.findOne({
      id: req.params.course_id,
    });
    if (!course) {
      next();
      return;
    }
    const admin = await Admin.findOne({ id: req.user.id, courses_access: 1 });
    if (course.owner_id != req.user.id && !admin) {
      res.status(401).json({
        message: "No permission to modify courses",
      });
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Errors occur when validating modify course permission",
    });
  }
};

module.exports = {
  validateCourseAccessPermission,
  validateCourseCreatePermission,
};
