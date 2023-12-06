const User = require("../models/Users.model");

const getUser = async (req, res) => {
  if (!req.params.id) {
    res.status(400).send({
      message: "Invalid content",
    });
    return;
  }

  try {
    const user = await User.findOne({ id: req.params.id });
    if (!user) {
      res.status(404).json({
        message: "Not found user",
      });
    } else {

      res.status(200).json({
        message: "Retrieve user's information successfully",
        user: user,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Errors occur when getting user's information",
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.getAll();
    res.status(200).json({
      message: "Retrieve user's information successfully",
      users: users,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Errors occur when getting all users' information",
    });
  }
};
// Update user information
const updateUserById = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Invalid content",
    });
    return;
  }

  try {
    const users = await User.updateById(req.user.id, req.body);
    res.status(200).json({
      message: "Users' information has been updated",
      users: users,
    });
  } catch (err) {
    console.log(err);

    if (err.code == "ER_BAD_FIELD_ERROR") {
      res.status(400).json({
        message: "Wrong fields",
      });
      return;
    }
    res.status(500).json({
      message: "Errors occur when updating users' information",
    });
  }
};

const deleteUserById = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Invalid content",
    });
    return;
  }

  try {
    const users = await User.deleteById(req.user.id);
    res.status(200).json({
      message: "Users have been deleted",
      users: users,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Errors occur when deleting users",
    });
  }
};
module.exports = {
  getUser,
  getAllUsers,
  updateUserById,
  deleteUserById,
};
