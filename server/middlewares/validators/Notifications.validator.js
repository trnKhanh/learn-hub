const {body} = require("express-validator");

const createNotificationScheme = [
    body("user_id")
        .exists()
        .withMessage("Must provide validate user id"),
    body("content")
        .exists()
        .withMessage("Must provide content of notification")
];

const updateNotificationScheme = [
    body("status")
        .exists()
        .withMessage("Must provide status of notification")
        .bail() //sai thi dung lai
        .isIn(["SEEN", "NOT SEEN"])
        .withMessage("Status must be SEEN or NOT SEEN")
];

module.exports = { createNotificationScheme, updateNotificationScheme };
