const Tutor = require("../models/Tutors.model");
const Admin = require("../models/Admins.model");
const FinancialAid = require("../models/FinancialAids.model");
const Course = require("../models/Courses.model");

const validateUpdateFinancialAidPermission = async (req, res, next) => {
  try {
    const course = await Course.findOne({
      id: req.params.course_id,
    });
    const financialAid = await FinancialAid.findOne({
      course_id: req.params.course_id,
      student_id: req.params.student_id,
    });
    if (financialAid.status == "ADMIN_DENIED") {
      res.status(401).json({
        message: "Financial aid has already been denied by admin",
      });
      return;
    }
    if (financialAid.status == "TUTOR_DENIED") {
      res.status(401).json({
        message: "Financial aid has already been denied by tutor",
      });
      return;
    }
    if (financialAid.status == "TUTOR_PASSED") {
      res.status(401).json({
        message: "Financial aid has already been passed",
      });
      return;
    }

    const admin = await Admin.findOne({ id: req.user.id, courses_access: 1 });

    if (financialAid.status == "PENDING" && admin) {
      next();
      return;
    }
    if (
      financialAid.status == "ADMIN_PASSED" &&
      req.user.id == course.owner_id
    ) {
      next();
      return;
    }

    res.status(401).json({
      message: "No permission to update this financial aid status"
    })
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Errors occur when validating update financial aid permission",
    });
  }
};

module.exports = {
  validateUpdateFinancialAidPermission,
};
