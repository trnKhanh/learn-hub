const supportersController = require("../controllers/Supporters.controller");
const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/Auth.middleware");
const {
  validateSupporterAccessPermission,
} = require("../middlewares/Supporters.middleware");
const {
  createSupporterScheme,
  updateSupporterScheme,
} = require("../middlewares/validators/Supporters.validator");

router.get("/", supportersController.getAllSupporters);

router.get("/:id", supportersController.getSupporter);

router.post(
  "/",
  [validateToken, validateSupporterAccessPermission, createSupporterScheme],
  supportersController.createSupporter,
);

router.patch(
  "/:id",
  [validateToken, validateSupporterAccessPermission, updateSupporterScheme],
  supportersController.updateSupporterById,
);

router.delete(
  "/:id",
  [validateToken, validateSupporterAccessPermission],
  supportersController.deleteSupporterById,
);

module.exports = router;
