const Course = require("../models/Courses.model");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty",
    });
    return;
  }

  let course = new Course({...req.body, admin_id: req.user.id});
  Course.create(course, (err, course) => {
    if (err) {
      res.status(500).json({
        message: err.message || "Errors occur when creating new course"
      });
      return;
    }

    res.json({
      message: "New course is created successfully"
    });
  })
}

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty",
    });
    return;
  }
  
  let courseId = req.body.id;
  let userId = req.user.id;
  let fields = req.body.fields;

  Course.findOne({id: courseId}, (err, course) => {
    if (err) {
      res.status(500).json({
        message: err.message || "Errors occur when updating course"
      });
      return;
    }

    if (!course) {
      res.status(400).json({
        message: "Course id is invalid"
      });
      return;

    }
    
    if (course.admin_id != userId) {
      res.status(401).json({
        message: "No permission to update course"
      });
      return;
    }

    Course.updateById(courseId, fields, (err, course) => {
      if (err) {
        res.status(500).json({
          message: err.message || "Errors occur when updating course"
        })
        return;
      }
      
      res.json({
        message: "Course has been updated"
      });
    })
  })
}
