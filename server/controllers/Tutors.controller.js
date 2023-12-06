const Tutor = require("../models/Tutors.model");

const createTutor = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Invalid content",
    });
    return;
  }
  try {
    if (!req.body.admin_id) req.body.admin_id = req.user.id;
    const newTutor = new Tutor(req.body);
    const tutor = await Tutor.create(newTutor);

    res.status(201).json({
      message: "Tutor has been created",
      tutor: tutor,
    });
  } catch (err) {
    console.log(err);

    if (err.code == "ER_BAD_FIELD_ERROR") {
      res.status(400).json({
        message: "Wrong fields",
      });
      return;
    }
    if (err.code == "ER_DUP_ENTRY") {
      res.status(409).json({
        message: "This user is an tutor",
      });
      return;
    }
    if (err.code == "ER_NO_REFERENCED_ROW_2") {
      res.status(422).json({
        message: "Admin id is invalid",
      });
      return;
    }

    res.status(500).json({
      message: "Errors occur when creating new tutor",
    });
  }
};

const getTutor = async (req, res) => {
  if (!req.params.id) {
    res.status(400).send({
      message: "Invalid content",
    });
    return;
  }

  try {
    const tutor = await Tutor.findOne({ id: req.params.id });
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
  if (!req.body || !req.params.id) {
    res.status(400).send({
      message: "Invalid content",
    });
    return;
  }

  try {
    const tutors = await Tutor.updateById(req.params.id, req.body);
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

    if (err.code == "ER_BAD_FIELD_ERROR") {
      res.status(400).json({
        message: "Wrong fields",
      });
      return;
    }
    if (err.code == "ER_NO_REFERENCED_ROW_2") {
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
  if (!req.params.id) {
    res.status(400).send({
      message: "Invalid content",
    });
    return;
  }

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
module.exports = {
  getTutor,
  getAllTutors,
  createTutor,
  updateTutorById,
  deleteTutorById,
};
