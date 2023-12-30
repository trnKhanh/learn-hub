const User = require("../models/Users.model");
const Course = require("../models/Courses.model");
const { validationResult, matchedData } = require("express-validator");

const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ id: req.params.id || req.user.id });
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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).send(errors);
    return;
  }
  const data = matchedData(req);
  if (req.file) data.profile_picture = req.file.path;

  try {
    const users = await User.updateById(req.user.id, data);
    res.status(200).json({
      message: "Users' information has been updated",
      users: users,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Errors occur when updating users' information",
    });
  }
};

const deleteUserById = async (req, res) => {
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

const getCourses = async (req, res) => {
  try {
    const courses = await Course.getByStudentId(req.user.id);
    res.status(200).json({
      message: "Retrieve all courses registered by student successfully",
      courses: courses,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Errors occur when gettign user's courses",
    });
  }
};
module.exports = {
  getUser,
  getAllUsers,
  updateUserById,
  deleteUserById,
  getCourses,
};
