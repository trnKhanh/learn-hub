const Payment = require("../models/Payments.model");
const Admin = require("../models/Admins.model");
const validatePaymentAccessPermission = async (req, res, next) => {
  try {
    const payment = await Payment.findOne({
      id: req.params.id,
    });
    const admin = await Admin.findOne({ id: req.user.id, username: "root" });
    if (!payment) {
      next();
      return;
    }
    if (payment.student_id != req.user.id && !admin) {
      res.status(401).json({
        message: "No permission to access payment",
      });
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Errors occur when validating access payment permission",
    });
  }
};

module.exports = { validatePaymentAccessPermission };
