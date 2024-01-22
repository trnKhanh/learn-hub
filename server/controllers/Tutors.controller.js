const Tutor = require("../models/Tutors.model");
const TutorCV = require("../models/TutorsCV.model");
const { validationResult, matchedData } = require("express-validator");

const createTutor = async (req, res) => {
  try {
    const newTutor = new Tutor({ id: req.user.id });
    const tutor = await Tutor.create(newTutor);

    if (req.file) {
      console.log(req.user)
      const newTutorCV = new TutorCV({
        tutor_id: req.user.id,
        cv_path: req.file.path,
      });
      const tutorCV = await TutorCV.create(newTutorCV);
    }

    res.status(201).json({
      message: "Tutor has been created",
      tutor: tutor,
    });
  } catch (err) {
    console.log(err);

    if (err.code == "ER_DUP_ENTRY") {
      res.status(409).json({
        message: "This user is an tutor",
      });
      return;
    }
    res.status(500).json({
      message: "Errors occur when creating new tutor",
    });
  }
};

const getTutor = async (req, res) => {
  try {
    const tutor = await Tutor.findOne({ 
      id: req.params.id === undefined ? req.user.id : req.params.id,
    });
    if (!tutor) {
      res.status(404).json({
        message: "Not found tutor",
      });
    } else {
      res.status(200).json({
        message: "Retrieve tutors' information successfully",
        tutor: tutor,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Errors occur when getting tutor's information",
    });
  }
};

const getAllTutors = async (req, res) => {
  try {
    const tutors = await Tutor.getAll();
    res.status(200).json({
      message: "Retrieve tutors' information successfully",
      tutors: tutors,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Errors occur when getting all tutors' information",
    });
  }
};

// Update tutor information
const updateTutorById = async (req, res) => {
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
    const tutors = await Tutor.updateById(req.params.id, data);
    if (!tutors) {
      res.status(404).json({
        message: "Not found tutor id",
      });
    } else {
      res.status(200).json({
        message: "Tutors' information has been updated",
        tutors: tutors,
      });
    }
  } catch (err) {
    console.log(err);

    if (err.code.includes("ER_NO_REFERENCED")) {
      res.status(422).json({
        message: "Admin id is invalid",
      });
      return;
    }
    res.status(500).json({
      message: "Errors occur when updating tutors' information",
    });
  }
};

const deleteTutorById = async (req, res) => {
  try {
    const tutors = await Tutor.deleteById(req.params.id);
    if (!tutors) {
      res.status(404).json({
        message: "Not found tutor id",
      });
    } else {
      res.status(200).json({
        message: "Tutors have been deleted",
        tutors: tutors,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Errors occur when deleting tutors",
    });
  }
};

const getCoursesOfTutor = async (req, res) => {
  try {
    const courses = await Tutor.getCoursesOfTutor(req.params.id);
    if (!courses) {
      res.status(404).json({
        message: "Not found tutor id",
      });
    } else {
      res.status(200).json({
        message: "Retrieve courses of tutor successfully",
        courses: courses,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Errors occur when getting courses of tutor",
    });
  }
}
module.exports = {
  getTutor,
  getAllTutors,
  createTutor,
  updateTutorById,
  deleteTutorById,
  getCoursesOfTutor,
};

