const {body} = require("express-validator");

//ktra noi dung hop le hay khong
const createLanguageScheme = [
    body("language_name")
      .exists()
      .withMessage("Must provide language name"),
  ];
  
  const updateLanguageScheme = [
    body("language_name")
      .exists()
      .withMessage("Must provide language name"),
  ];
  
  module.exports = { createLanguageScheme, updateLanguageScheme };
  