const Course = require("../models/Courses.model");
const Admin = require("../models/Admins.model");

// Create new course
const create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Invalid content",
    });
    return;
  }
  // Get userId from req passed by authMiddleWare
  let course = new Course({ owner: req.user.id, ...req.body });

  // Create new course if current user has permission (is admin)
  Course.create(course, (err, course) => {
    if (err) {
      res.status(500).json({
        message: "Errors occur when creating new course",
      });
      return;
    }

    res.json({
      message: "New course is created successfully",
    });
  });
};

// Update course
const update = (req, res) => {
  if (!req.body || !req.body.id) {
    res.status(400).send({
      message: "Invalid content",
    });
    return;
  }

  let { id, ...columns } = req.body;
  // Update course
  Course.update({ id: id }, columns, (err, course) => {
    if (err) {
      res.status(500).json({
        message: "Errors occur when updating course",
      });
    } else {
      res.json({
        message: "Course has been updated",
      });
    }
  });
};

module.exports = {
  create,
  update,
};
