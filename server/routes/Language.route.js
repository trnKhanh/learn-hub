const {validateToken} = require("../middlewares/Auth.middleware"); //check token
const languageController = require("../controllers/Language.controller");

const {validateLanguageAccessPermission} = require("../middlewares/Language.middleware");
const {
    createLanguageScheme,
    updateLanguageScheme,
  } = require("../middlewares/validators/Language.validator");

const express = require("express");
const router = express.Router();

router.get("/" , languageController.getAllLanguages);
router.get("/:id", languageController.getLanguage);
router.post(
    "/",
    [validateToken , validateLanguageAccessPermission , createLanguageScheme],
    languageController.createLanguage
);
router.patch(
    "/:id",
    [validateToken , validateLanguageAccessPermission , updateLanguageScheme],
    languageController.updateLanguage
);
router.delete(
    "/:id",
    [validateToken , validateLanguageAccessPermission],
    languageController.deleteLanguageById
);

module.exports = router;