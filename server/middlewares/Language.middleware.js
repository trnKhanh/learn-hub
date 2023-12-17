const Admin = require("../models/Admins.model");

const validateLanguageAccessPermission = async (req, res, next) => {
  try {
    const admin = await Admin.findOne({
      id: req.user.id, //from token
    });
    if (!admin) {
      res.status(401).json({
        message: "No permission to access language editor",
      });
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error occurred while validating language editing",
    });
  }
};

module.exports = { validateLanguageAccessPermission };
