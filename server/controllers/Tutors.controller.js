const Tutor = require("../models/Tutors.model");

const create = (req, res) => {
  if (!req.body) {
    res.status(400).json({
      message: "Invalid content",
    });
    return;
  }
  let tutor = new Tutor(req.body);

  Tutor.create(tutor, (err, tutor) => {
    if (err) {
      if (err.code == "ER_DUP_ENTRY") {
        res.status(409).json({
          message: "User is already a tutor",
        });
        return;
      }
      res.status(500).json({
        message: "Errors occur when creating new tutor",
      });
    } else {
      res.status(201).json({
        message: "New tutor has been created",
      });
    }
  });
};

module.exports = {
  create,
};
