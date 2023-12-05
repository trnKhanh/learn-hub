const User = require("../models/Users.model");

// Update user information
const updateUser = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Invalid content",
    });
    return;
  }

  try {
    const users = await User.update({ uuid: req.user.id }, req.body);
    const { id, password, ...userInfo } = users[0];
    res.status(200).json({
      message: "User's information has been updated",
      user: userInfo,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Errors occur when updating user's information",
    });
  }
};

const deleteUser = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Invalid content",
    });
    return;
  }

  try {
    const users = await User.delete({ uuid: req.user.id });
    const { id, password, ...userInfo } = users[0];
    res.status(200).json({
      message: "User has been deleted",
      user: userInfo,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Errors occur when deleting user's information",
    });
  }
};
module.exports = {
  updateUser,
  deleteUser,
};
