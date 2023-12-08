const Student = require("../models/Students.model.js");
const validateStudent = async (req, res, next) => {
  try {
    const student = await Student.findOne({ id: req.user.id });
    if (!student) {
      res.status(401).json({
        message: "Only student can add courses to cart",
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

module.exports = { validateStudent };
