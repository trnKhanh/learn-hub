const Admin = require("../models/Admins.model");

const validateTutorCreatePermission = async (req, res, next) => {
  Admin.findOne({ id: req.user.id }, (err, admin) => {
    if (err) {
      res.status(500).json({
        message: "Errors occur when validate tutor create permission",
      });
    } else {
      if (!admin) {
        res.status(401).json({
          message: "User has no permission to create new tutor",
        });
      } else {
        next();
      }
    }
  });
};

module.exports = { validateTutorCreatePermission };
