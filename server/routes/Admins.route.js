const adminsController = require("../controllers/Admins.controller");
const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/Auth.middleware");
const {
  validateAccessAdminPermission,
} = require("../middlewares/Admins.middleware");

router.get(
  "/",
  [validateToken, validateAccessAdminPermission],
  adminsController.getAllAdmins,
);
router.get(
  "/:id",
  [validateToken, validateAccessAdminPermission],
  adminsController.getAdmin,
);

router.post(
  "/",
  [validateToken, validateAccessAdminPermission],
  adminsController.createAdmin,
);

router.patch(
  "/:id",
  [validateToken, validateAccessAdminPermission],
  adminsController.updateAdminById,
);

router.delete(
  "/:id",
  [validateToken, validateAccessAdminPermission],
  adminsController.deleteAdminById,
);

module.exports = router;
