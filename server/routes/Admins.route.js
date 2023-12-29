const adminsController = require("../controllers/Admins.controller");
const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/Auth.middleware");
const {
  validateAccessAdminPermission,
} = require("../middlewares/Admins.middleware");

const {
  createAdminSchema,
  updateAdminSchema,
} = require("../middlewares/validators/Admins.validators");

router.get(
  "/",
  [validateToken, validateAccessAdminPermission],
  adminsController.getAllAdmins,
);
router.get(
  "/mine",
  [validateToken],
  adminsController.getAdmin,
);
router.get(
  "/:id",
  [validateToken, validateAccessAdminPermission],
  adminsController.getAdmin,
);

router.post(
  "/",
  [validateToken, validateAccessAdminPermission, createAdminSchema],
  adminsController.createAdmin,
);

router.patch(
  "/:id",
  [validateToken, validateAccessAdminPermission, updateAdminSchema],
  adminsController.updateAdminById,
);

router.delete(
  "/:id",
  [validateToken, validateAccessAdminPermission],
  adminsController.deleteAdminById,
);

module.exports = router;
