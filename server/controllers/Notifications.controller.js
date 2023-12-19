const Notification = require("../models/Notifications.model");
const { validationResult, matchedData } = require("express-validator");

const createNotification = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).send(errors);
    return;
  }
  const data = matchedData(req);

  try {
    const newNotification = new Notification(data);
    const notification = await Notification.create(newNotification);

    res.status(201).json({
      message: "Notification has been created",
      notification: notification,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Errors occur when creating new supporter",
    });
  }
};

//get all notification with user id
const getNotificationById = async (req , res) => {
    try {
        const notifications = await Notification.findNotificationByUserId({user_id: req.user.id});
        if (!notifications) {
            res.status(404).json({
            message: "Not found notification",
            });
        } else {
            res.status(200).json({
            message: "Retrieve notification successfully",
            notifications: notifications,
            });
        }
    }
    catch (err) {
        console.log(err);

        res.status(500).json({
            message: "Errors occur when getting notification"
        });
    }
};

// const getNotificationByIdTime = async (req , res) => {
//     try {
//         const Notification = await Notification.findNotificationByUserIdTime({user_id: req.user.id, notified_at: req.params.time});
//         if (!Notification) {
//             res.status(404).json({
//             message: "Not found notification",
//             });
//         } else {
//             res.status(200).json({
//             message: "Retrieve notification successfully",
//             Notification: Notification,
//             });
//         }
//     }
//     catch (err) {
//         console.log(err);

//         res.status(500).json({
//             message: "Errors occur when getting notification"
//         });
//     }
// };

const updateNotification = async (req , res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).send(errors);
        return;
    }

    const data = matchedData(req);
    if(!Object.keys(data).length) {
        res.status(400).json({
            message: "Must provide valid fields",
        });
        return;
    }

    try {
        const notification = await Notification.updateById(req.params.id, data);
        if(!notification) {
            res.status(404).json({
                message: "Not found notification id"
            });
        }
        else {
            res.status(200).json({
                message: "Notification has been updated",
                notification: notification,
            });
        }
    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: "Errors occur when updating notification"
        });
    }
};

const deleteNotificationById = async (req , res) => {
    try {
        const notification = await Notification.deleteById(req.params.id);
        if(!notification) {
            res.status(404).json({
                message: "Not found notification id"
            });
        }
        else {
            res.status(200).json({
                message: "Notification have been deleted",
                notification: notification,
            });
        }
    }
    catch (err) {
        console.log(err);

        res.status(500).json({
            message: "Errors occur when deleting notification"
        });
    }
};

module.exports = {
    createNotification,
    getNotificationById,
    // getNotificationByIdTime,
    updateNotification
    // deleteNotificationById
};
