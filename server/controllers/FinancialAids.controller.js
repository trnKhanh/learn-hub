const FinancialAid = require("../models/FinancialAids.model");
const Admin = require("../models/Admins.model");
const Tutor = require("../models/Tutors.model");
const { validationResult, matchedData } = require("express-validator");

const putFinancialAid = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).send(errors);
    return;
  }
  const data = matchedData(req);
  try {
    const newFinancialAid = new FinancialAid({
      course_id: req.params.course_id,
      student_id: req.user.id,
      ...data,
    });
    const financialAid = await FinancialAid.create(newFinancialAid);

    res.status(201).json({
      message: "Financial aid has been created",
      financialAid: financialAid,
    });
  } catch (err) {
    if (err.code == "ER_DUP_ENTRY") {
      try {
        const newFinancialAid = new FinancialAid({
          course_id: req.params.course_id,
          student_id: req.user.id,
          ...data,
        });
        const financialAid = await FinancialAid.updateById(
          req.params.course_id,
          req.user.id,
          newFinancialAid,
        );
        res.status(201).json({
          message: "Financial aid has been updated",
          financialAid: financialAid,
        });
      } catch (err) {
        console.log(err);
        res.status(500).json({
          message: "Errors occur when udpating financial aids",
        });
      }
      return;
    }

    console.log(err);
    res.status(500).json({
      message: "Errors occur when creating new Financial aid",
    });
  }
};

const getFinancialAid = async (req, res) => {
  try {
    const financialAid = await FinancialAid.findOne({
      course_id: req.params.course_id,
      student_id:
        req.params.student_id === undefined
          ? req.user.id
          : req.params.student_id,
    });
    if (!financialAid) {
      res.status(404).json({
        message: "Not found Financial aid",
      });
    } else {
      res.status(200).json({
        message: "Retrieve Financial aid successfully",
        financialAid: financialAid,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Errors occur when getting Financial aid",
    });
  }
};

const getAllFinancialAidsByCourseId = async (req, res) => {
  try {
    const financialAids = await FinancialAid.findAll({
      course_id: req.params.course_id,
    });
    res.status(200).json({
      message: "Retrieve Financial aid successfully",
      financialAids: financialAids,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Errors occur when getting Financial aid",
    });
  }
};
const getAllFinancialAidsByStudentId = async (req, res) => {
  try {
    const financialAids = await FinancialAid.findAll({
      student_id: req.params.student_id,
    });
    res.status(200).json({
      message: "Retrieve Financial aid successfully",
      financialAids: financialAids,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Errors occur when getting Financial aid",
    });
  }
};

const getAllFinancialAids = async (req, res) => {
  try {
    const financialAids = await FinancialAid.getAll();
    res.status(200).json({
      message: "Retrieve Financial aids successfully",
      financialAids: financialAids,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Errors occur when getting all Financial aids",
    });
  }
};

const updateFinancialAidStatus = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).send(errors);
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
    let status;
    const admin = await Admin.findOne({ id: req.user.id, courses_access: 1 });
    if (admin) {
      status = "ADMIN_" + data.status;
    } else {
      status = "TUTOR_" + data.status;
    }
    const financialAids = await FinancialAid.updateById(
      req.params.course_id,
      req.params.student_id,
      {
        status: status,
      },
    );
    if (!financialAids) {
      res.status(404).json({
        message: "Not found Financial aid",
      });
    } else {
      res.status(200).json({
        message: "Financial aid has been updated",
        financialAids: financialAids,
      });
    }
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Errors occur when updating Financial aid",
    });
  }
};

const deleteFinancialAid = async (req, res) => {
  try {
    const financialAids = await FinancialAid.deleteById(
      req.params.course_id,
      req.user.id,
    );
    if (!financialAids) {
      res.status(404).json({
        message: "Not found Financial aid",
      });
    } else {
      res.status(200).json({
        message: "Financial aid has been deleted",
        financialAids: financialAids,
      });
    }
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Errors occur when deleting Financial aid",
    });
  }
};

module.exports = {
  putFinancialAid,
  getFinancialAid,
  getAllFinancialAids,
  getAllFinancialAidsByCourseId,
  getAllFinancialAidsByStudentId,
  deleteFinancialAid,
  updateFinancialAidStatus,
};
