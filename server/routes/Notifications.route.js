const notificationsController = require("../controllers/Notifications.controller");
const express = require("express");
const router = express.Router();
const {validateToken} = require("../middlewares/Auth.middleware");
const {
    validateNotificationAccessPermission,
} = require("../middlewares/Notifications.middleware")

//validate phan tao thong bao

const {
    createNotificationScheme, 
    updateNotificationScheme,
} = require("../middlewares/validators/Notifications.validator");

// router.get("/" , )
router.get("/" , 
    [validateToken, validateNotificationAccessPermission],
    notificationsController.getNotificationById
);
router.patch(
    "/:id",
    [validateToken , validateNotificationAccessPermission , updateNotificationScheme],
    notificationsController.updateNotification,
);



// update status notification -- finacial aid

// router.get("/:id/:time", notificationsController.getNotificationByIdTime);

router.post(
    "/",
    [validateToken , createNotificationScheme],
    notificationsController.createNotification,
);

module.exports = router;