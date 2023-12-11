const Admin = require("../models/Admins.model");
const Tutor = require("../models/Tutors.model");

const validateTutorAccessPermission = async (req, res, next) => {
  try {
    const admin = await Admin.findOne({ id: req.user.id, tutors_access: 1 });
    if (!admin) {
      res.status(401).json({
        message: "No permission to access tutors",
      });
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Errors occur when validating create tutor permission",
    });
  }
};

const validateTutor = async (req, res, next) => {
  try {
    const tutor = await Tutor.findOne({ id: req.user.id });
    if (!tutor) {
      res.status(401).json({
        message: "This user is not tutor",
      });
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Errors occurs when validating tutor",
    });
  }
};

module.exports = { validateTutorAccessPermission, validateTutor };
