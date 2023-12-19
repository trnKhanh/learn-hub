const validateNotificationAccessPermission = async (req, res, next) => {
  try {
    const notification = await Notification.findOne({
      user_id: req.user.id, 
      id: req.params.id,
    });
    if (!notification) {
      res.status(401).json({
        message: "No permission to access notifications",
      });
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Errors occur when validating update notification permission",
    });
  }
}

module.exports = { validateNotificationAccessPermission };