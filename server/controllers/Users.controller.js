const User = require("../models/Users.model");

// Update user information
const updateById = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Invalid content",
    });
    return;
  }

  let { id, ...columns } = req.body;

  User.update({ id: req.user.id }, columns, (err, user) => {
    if (err) {
      res.status(500).json({
        message: "Errors occur when updating user",
      });
      return;
    }

    res.send({
      message: "User's information has been updated",
    });
  });
};

module.exports = {
  updateById,
};
