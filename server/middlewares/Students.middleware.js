const Admin = require("../models/Admins.model");
const Student = require("../models/Students.model.js");

const validateStudentAccessPermission = async (req, res, next) => {
  try {
    const admin = await Admin.findOne({ id: req.user.id, students_access: 1 });
    if (!admin) {
      res.status(401).json({
        message: "No permission to access students",
      });
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Errors occur when validating create student permission",
    });
  }
};

const validateStudent = async (req, res, next) => {
  try {
    const student = await Student.findOne({ id: req.user.id });
    if (!student) {
      res.status(401).json({
        message: "This user is not student",
      });
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Errors occurs when validating student",
    });
  }
};

module.exports = { validateStudent, validateStudentAccessPermission };
