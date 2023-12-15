const financialAidsController = require("../controllers/FinancialAids.controller");
const express = require("express");
const router = express.Router({ mergeParams: true });
const { validateToken } = require("../middlewares/Auth.middleware");
const {
  validateCourseCreatePermission,
  validateCourseAccessPermission,
} = require("../middlewares/Courses.middleware");

const {
  validateUpdateFinancialAidPermission,
} = require("../middlewares/FinancialAids.middleware");
const { validateStudent } = require("../middlewares/Students.middleware");

const {
  createFinancialAidScheme,
  updateStatusFinancialAidScheme,
} = require("../middlewares/validators/FinancialAids.validator");

router.post(
  "/",
  [validateToken, validateStudent, createFinancialAidScheme],
  financialAidsController.createFinancialAid,
);

router.get(
  "/:student_id",
  [validateToken, validateCourseAccessPermission],
  financialAidsController.getFinancialAid,
);
router.get(
  "/",
  [validateToken, validateCourseAccessPermission],
  financialAidsController.getAllFinancialAidsByCourseId,
);

router.patch(
  "/:student_id",
  [
    validateToken,
    validateUpdateFinancialAidPermission,
    updateStatusFinancialAidScheme,
  ],
  financialAidsController.updateFinancialAidStatus,
);
router.delete(
  "/:student_id",
  [validateToken, validateStudent],
  financialAidsController.deleteFinancialAid,
);

module.exports = router;
