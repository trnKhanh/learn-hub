const {body} = require("express-validator");

//ktra noi dung hop le hay khong
const createLanguageScheme = [
  body("language_name")
    .exists()
    .withMessage("Must provide language name")
    .notEmpty()
    .withMessage("Language name must not be empty"),
];

const updateLanguageScheme = [
  body("language_name")
    .exists()
    .withMessage("Must provide language name")
    .notEmpty()
    .withMessage("Language name must not be empty"),
];
  
  module.exports = { createLanguageScheme, updateLanguageScheme };
  