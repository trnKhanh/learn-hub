const Admin = require("../models/Admins.model");

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

module.exports = { validateTutorAccessPermission };
