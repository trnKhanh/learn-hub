const Supporter = require("../models/Supporters.model");

const createSupporter = async (req, res) => {
  const errors = validationResult(req); 
  if (!errors.isEmpty()) {
    res.status(422).send(errors);
    return;
  }
  const data = matchedData(req); 

  try {
    const newSupporter = new Supporter(req.body);
    const supporter = await Supporter.create(newSupporter);

    res.status(201).json({
      message: "Supporter has been created",
      supporter: supporter,
    });
  } catch (err) {
    console.log(err);

    if (err.code == "ER_BAD_FIELD_ERROR") {
      res.status(400).json({
        message: "Wrong fields",
      });
      return;
    }
    if (err.code == "WARN_DATA_TRUNCATED") {
      res.status(400).json({
        message: "Wrong roles"
      });
      return;
    }
    if (err.code == "ER_DUP_ENTRY") {
      res.status(409).json({
        message: "This user is an supporter",
      });
      return;
    }

    res.status(500).json({
      message: "Errors occur when creating new supporter",
    });
  }
};

const getSupporter = async (req, res) => {
  if (!req.params.id) {
    res.status(400).send({
      message: "Invalid content",
    });
    return;
  }

  try {
    const supporter = await Supporter.findOne({ id: req.params.id });
    if (!supporter) {
      res.status(404).json({
        message: "Not found supporter",
      });
    } else {
      res.status(200).json({
        message: "Retrieve supporters' information successfully",
        supporter: supporter,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Errors occur when getting supporter's information",
    });
  }
};

const getAllSupporters = async (req, res) => {
  try {
    const supporters = await Supporter.getAll();
    res.status(200).json({
      message: "Retrieve supporters' information successfully",
      supporters: supporters,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Errors occur when getting all supporters' information",
    });
  }
};

// Update supporter information
const updateSupporterById = async (req, res) => {
  if (!req.body || !req.params.id) {
    res.status(400).send({
      message: "Invalid content",
    });
    return;
  }

  try {
    const supporters = await Supporter.updateById(req.params.id, req.body);
    if (!supporters) {
      res.status(404).json({
        message: "Not found supporter id",
      });
    } else {
      res.status(200).json({
        message: "Supporters' information has been updated",
        supporters: supporters,
      });
    }
  } catch (err) {
    console.log(err);

    if (err.code == "WARN_DATA_TRUNCATED") {
      res.status(400).json({
        message: "Wrong roles"
      });
      return;
    }
    if (err.code == "ER_BAD_FIELD_ERROR") {
      res.status(400).json({
        message: "Wrong fields",
      });
      return;
    }
    res.status(500).json({
      message: "Errors occur when updating supporters' information",
    });
  }
};

const deleteSupporterById = async (req, res) => {
  if (!req.params.id) {
    res.status(400).send({
      message: "Invalid content",
    });
    return;
  }

  try {
    const supporters = await Supporter.deleteById(req.params.id);
    if (!supporters) {
      res.status(404).json({
        message: "Not found supporter id",
      });
    } else {
      res.status(200).json({
        message: "Supporters have been deleted",
        supporters: supporters,
      });
    }
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Errors occur when deleting supporters",
    });
  }
};
module.exports = {
  getSupporter,
  getAllSupporters,
  createSupporter,
  updateSupporterById,
  deleteSupporterById,
};
