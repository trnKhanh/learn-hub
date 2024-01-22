const {body} = require("express-validator");

const createSubjectScheme = [
    body("name")
        .exists()
        .withMessage("Must provide subject name")
        .notEmpty()
        .withMessage("Subject name must not be empty"),
];

const updateSubjectScheme = [
    body("name")
        .exists()
        .withMessage("Must provide subject name")
        .notEmpty()
        .withMessage("Subject name must not be empty"),
];

module.exports = { createSubjectScheme, updateSubjectScheme };