const Course = require("../models/Courses.model");
const Admin = require("../models/Admins.model");

// Create new course
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty",
    });
    return;
  }
  // Get userId from req passed by authMiddleWare
  let userId = req.user.id;
  let course = new Course({ ...req.body, admin_id: req.user.id });

  // Check if current user is admin
  Admin.findOne({ id: userId }, (err, admin) => {
    if (err) {
      res.status(500).json({
        message: err.message || "Errors occur when finding admin",
      });
      return;
    }

    if (!admin) {
      res.status(401).json({
        message: "No permission to create new course",
      });
      return;
    }

    // Create new course if current user has permission (is admin)
    Course.create(course, (err, course) => {
      if (err) {
        res.status(500).json({
          message: err.message || "Errors occur when creating new course",
        });
        return;
      }

      res.json({
        message: "New course is created successfully",
      });
    });
  });
};

// Update course
exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty",
    });
    return;
  }

  // Get user id from req passed by authMiddleWare
  let userId = req.user.id;
  let courseId = req.body.id;
  let fields = req.body.fields;

  // Find the course with corresponding course id
  Course.findOne({ id: courseId }, (err, course) => {
    if (err) {
      res.status(500).json({
        message: err.message || "Errors occur when updating course",
      });
      return;
    }

    // Find no course
    if (!course) {
      res.status(400).json({
        message: "Course id is invalid",
      });
      return;
    }

    // Check if current user is creater of updated course
    if (course.admin_id != userId) {
      res.status(401).json({
        message: "No permission to update course",
      });
      return;
    }

    // Update course
    Course.updateById(courseId, fields, (err, course) => {
      if (err) {
        res.status(500).json({
          message: err.message || "Errors occur when updating course",
        });
        return;
      }

      res.json({
        message: "Course has been updated",
      });
    });
  });
};
