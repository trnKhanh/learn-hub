const Subject = require("../models/Subjects.model");
const { validationResult, matchedData } = require("express-validator");

const getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.findAll();
    if (!subjects.length) {
      res.status(404).json({
        message: "Not found subjects",
      });
    } else {
      res.status(200).json({
        message: "Retrieve subject's information successfully",
        subjects: subjects,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Errors occur when getting subject's information",
    });
  }
};

const getSubjectsOfCourseId = async (req, res) => {
  try {
    const subjects = await Subject.getSubjectsOfCourse(req.params.course_id);
    if (!subjects.length) {
      res.status(404).json({
        message: "Not found subjects",
      });
    } else {
      res.status(200).json({
        message: "Retrieve subject's information successfully",
        subjects: subjects,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Errors occur when getting subject's information",
    });
  }
};

const getSubjectById = async (req, res) => {
  try {
    const subject = await Subject.findById({ id: req.params.id });

    if (!subject) {
      res.status(404).json({
        message: "Not found subject",
      });
    } else {
      res.status(200).json({
        message: "Retrieve subject's information successfully",
        subject: subject,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Errors occur when getting subject's information",
    });
  }
};

const createSubject = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).send(errors);
    return;
  }
  const data = matchedData(req);

  try {
    const newSubject = new Subject(data);
    const subject = await Subject.create(newSubject);

    res.status(201).json({
      message: "Subject has been created",
      subject: subject,
    });
  } catch (err) {
    console.log(err);

    if (err.code == "ER_DUP_ENTRY") {
      res.status(409).json({
        message: "This subject is already existed",
      });
      return;
    }
    res.status(500).json({
      message: "Errors occur when creating new subject",
    });
  }
};

const updateSubjectById = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).send(errors);
    return;
  }

  const data = matchedData(req);
  if (!Object.keys(data).length) {
    res.status(400).json({
      message: "No data to update",
    });
    return;
  }

  try {
    const subject = await Subject.updateById(req.params.id, data);
    if (!subject) {
      res.status(404).json({
        message: "Not found subject id",
      });
    } else {
      res.status(200).json({
        message: "Subject' information has been updated",
        subject: subject,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Errors occur when updating subject",
    });
  }
};

const deleteSubjectById = async (req, res) => {
  try {
    const subject = await Subject.deleteById(req.params.id);
    if (!subject) {
      res.status(404).json({
        message: "Not found subject id",
      });
    } else {
      res.status(200).json({
        message: "Subject has been deleted",
        subject: subject,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Errors occur when deleting subject",
    });
  }
};

module.exports = {
  getAllSubjects,
  getSubjectsOfCourseId,
  getSubjectById,
  createSubject,
  updateSubjectById,
  deleteSubjectById,
};
