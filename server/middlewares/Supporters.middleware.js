const Admin = require("../models/Admins.model");

const validateSupporterAccessPermission = async (req, res, next) => {
  try {
    const admin = await Admin.findOne({
      id: req.user.id, 
      supporters_access: 1,
    });
    if (!admin) {
      res.status(401).json({
        message: "No permission to access supporters",
      });
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Errors occur when validating create supporter permission",
    });
  }
};

module.exports = { validateSupporterAccessPermission };
