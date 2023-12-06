const supportersController = require("../controllers/Supporters.controller");
const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/Auth.middleware");
const {
  validateSupporterAccessPermission,
} = require("../middlewares/Supporters.middleware");

router.get("/", supportersController.getAllSupporters);

router.get("/:id", supportersController.getSupporter);

router.post(
  "/",
  [validateToken, validateSupporterAccessPermission],
  supportersController.createSupporter,
);

router.patch(
  "/:id",
  [validateToken, validateSupporterAccessPermission],
  supportersController.updateSupporterById,
);

router.delete(
  "/:id",
  [validateToken, validateSupporterAccessPermission],
  supportersController.deleteSupporterById,
);

module.exports = router;
