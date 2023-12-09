const Admin = require("../models/Admins.model");
const { validationResult, matchedData } = require("express-validator");

const createAdmin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).send(errors.array());
    return;
  }
  const data = matchedData(req);

  try {
    const newAdmin = new Admin(data);
    const admin = await Admin.create(newAdmin);

    res.status(201).json({
      message: "Admin has been created",
      admin: admin,
    });
  } catch (err) {
    console.log(err);

    if (err.code == "ER_DUP_ENTRY") {
      res.status(409).json({
        message: "This user is an admin",
      });
      return;
    }
    res.status(500).json({
      message: "Errors occur when creating new admin",
    });
  }
};

const getAdmin = async (req, res) => {
  try {
    const admin = await Admin.findOne({ id: req.params.id });
    if (!admin) {
      res.status(404).json({
        message: "Not found admin",
      });
    } else {
      res.status(200).json({
        message: "Retrieve admins' information successfully",
        admin: admin,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Errors occur when getting admin's information",
    });
  }
};

const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.getAll();
    res.status(200).json({
      message: "Retrieve admins' information successfully",
      admins: admins,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Errors occur when getting all admins' information",
    });
  }
};

// Update admin information
const updateAdminById = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).send(errors.array());
    return;
  }
  const data = matchedData(req);
  if (!Object.keys(data).length) {
    res.status(400).json({
      message: "Must provide valid fields",
    });
    return;
  }

  try {
    const admins = await Admin.updateById(req.params.id, data);
    if (!admins) {
      res.status(404).json({
        message: "Not found admin id",
      });
    } else {
      res.status(200).json({
        message: "Admins' information has been updated",
        admins: admins,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Errors occur when updating admins' information",
    });
  }
};

const deleteAdminById = async (req, res) => {
  try {
    const admins = await Admin.deleteById(req.params.id);
    if (!admins) {
      res.status(404).json({
        message: "Not found admin id",
      });
    } else {
      res.status(200).json({
        message: "Admins have been deleted",
        admins: admins,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Errors occur when deleting admins",
    });
  }
};
module.exports = {
  getAdmin,
  getAllAdmins,
  createAdmin,
  updateAdminById,
  deleteAdminById,
};
