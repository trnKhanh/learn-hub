const {body} = require("express-validator");

const createNoteScheme = [
    body("content")
        .exists()
        .withMessage("Must provide content of note"),
];

const updateNoteScheme = [
    body("content")
        .exists()
        .withMessage("Must provide content of note"),
];

module.exports = { createNoteScheme, updateNoteScheme};