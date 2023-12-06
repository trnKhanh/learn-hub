const Admin = require("../models/Admins.model");

const validateAccessAdminPermission = async (req, res, next) => {
  try {
    const admin = await Admin.findOne({ id: req.user.id, username: "root" });
    if (!admin) {
      res.status(401).json({
        message: "No permission to access admins",
      });
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Errors occur when validating create admin permission",
    });
  }
};

module.exports = { validateAccessAdminPermission };
