const TutorCV = require("../models/TutorsCV.model");
const Tutor = require("../models/Tutors.model");
const { validationResult, matchedData } = require("express-validator");

const putTutorCV = async (req, res) => {
  try {
    if (req.file) {
      const newTutorCV = new TutorCV({
        tutor_id: req.user.id,
        cv_path: req.file.path,
      });
      const tutorCV = await TutorCV.create(newTutorCV);

      res.status(201).json({
        message: "Tutor CV has been created",
      });
    } else {
      res.status(400).json({
        message: "CV file is required",
      });
    }
  } catch (err) {
    console.log(err);

    if (err.code == "ER_DUP_ENTRY") {
      try {
        const tutorCV = await TutorCV.updateById(req.user.id, {
          cv_path: req.file.path,
        });
        res.status(201).json({
          message: "Tutor CV has been updated",
        });
      } catch (err) {
        res.status(500).json({
          message: "Errors occur when udpating tutor CV",
        });
      }
      return;
    }
    res.status(500).json({
      message: "Errors occur when creating new tutor CV",
    });
  }
};

const getTutorCV = async (req, res) => {
  try {
    const tutorCV = await TutorCV.findOne({ tutor_id: req.params.id });
    if (!tutorCV) {
      res.status(404).json({
        message: "Not found tutor CV",
      });
    } else {
      res.status(200).json({
        message: "Retrieve tutor CV successfully",
        tutorCV: tutorCV,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Errors occur when getting tutor CV",
    });
  }
};
const downloadTutorCV = async (req, res) => {
  try {
    const tutorCV = await TutorCV.findOne({ tutor_id: req.params.id }, true);
    if (!tutorCV) {
      res.status(404).json({
        message: "Not found tutor CV",
      });
    } else {
      res.download(tutorCV.cv_path, (err) => {
        if (err) {
          if (err.code == "ENOENT") {
            res.status(404).send();
            return;
          }
          res.status(500).send();
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Errors occur when getting tutor CV",
    });
  }
};

const getAllTutorCVs = async (req, res) => {
  try {
    const tutorCVs = await TutorCV.getAll();
    res.status(200).json({
      message: "Retrieve tutor CVs successfully",
      tutorCVs: tutorCVs,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Errors occur when getting all tutor CVs",
    });
  }
};

const updateTutorCVStatus = async (req, res) => {
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
    if (data.status == "PASSED") {
      await Tutor.updateById(req.params.id, { verified: 1 });
    } else {
      await Tutor.updateById(req.params.id, { verified: 0 });
    }
    const tutorCVs = await TutorCV.updateById(req.params.id, {
      status: data.status,
    });
    if (!tutorCVs) {
      res.status(404).json({
        message: "Not found tutor id",
      });
    } else {
      res.status(200).json({
        message: "Tutor CV's information has been updated",
        tutorCVs: tutorCVs,
      });
    }
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Errors occur when updating tutor CV",
    });
  }
};

const deleteTutorCV = async (req, res) => {
  try {
    const tutorCVs = await TutorCV.deleteById(req.user.id);
    if (!tutorCVs) {
      res.status(404).json({
        message: "Not found tutor CV",
      });
    } else {
      res.status(200).json({
        message: "Tutor CV has been deleted",
        tutorCVs: tutorCVs,
      });
    }
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Errors occur when deleting tutor CV",
    });
  }
};

module.exports = {
  putTutorCV,
  getTutorCV,
  getAllTutorCVs,
  downloadTutorCV,
  deleteTutorCV,
  updateTutorCVStatus,
};
