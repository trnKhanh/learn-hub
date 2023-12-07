const Course = require("../models/Courses.model");
const Tutor = require("../models/Tutors.model");

const createCourse = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Invalid content",
    });
    return;
  }
  try {
    if (!req.body.owner_id) {
      req.body.owner_id = req.user.id;
    }
    if (req.body.owner_id) {
      const tutor = await Tutor.findOne({ id: req.body.owner_id, verified: 1 });
      if (!tutor) {
        res.status(422).json({
          message: "Owner is not verified tutor",
        });
        return;
      }
    }
    const newCourse = new Course(req.body);
    const course = await Course.create(newCourse);
    res.status(201).json({
      message: "Course has been created",
      course: course,
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
        message: "Course with the same name has existed",
      });
      return;
    }
    res.status(500).json({
      message: "Errors occur when creating new course",
    });
  }
};
const getCourse = async (req, res) => {
  if (!req.params.id) {
    res.status(400).send({
      message: "Invalid content",
    });
    return;
  }

  try {
    const course = await Course.findOne({ id: req.params.id });
    if (!course) {
      res.status(404).json({
        message: "Not found course",
      });
    } else {
      res.status(200).json({
        message: "Retrieve course's information successfully",
        course: course,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Errors occur when getting course's information",
    });
  }
};

const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.getAll();
    res.status(200).json({
      message: "Retrieve courses' information successfully",
      courses: courses,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Errors occur when getting all courses' information",
    });
  }
};

// Update course information
const updateCourse = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Invalid content",
    });
    return;
  }
  if (req.body.owner_id) {
    const tutor = await Tutor.findOne({ id: req.body.owner_id, verified: 1 });
    if (!tutor) {
      res.status(422).json({
        message: "Owner is not verified tutor",
      });
      return;
    }
  }

  try {
    const courses = await Course.updateById(req.params.id, req.body);
    if (!courses) {
      res.status(404).json({
        message: "Not found courses id",
      });
    } else {
      res.status(200).json({
        message: "Courses' information has been updated",
        courses: courses,
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
    res.status(500).json({
      message: "Errors occur when updating courses' information",
    });
  }
};

const deleteCourse = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Invalid content",
    });
    return;
  }

  try {
    const courses = await Course.deleteById(req.params.id);
    if (!courses) {
      res.status(404).json({
        message: "Not found courses id",
      });
    } else {
      res.status(200).json({
        message: "Courses have been deleted",
        courses: courses,
      });
    }
  } catch (err) {
    console.log(err);
    if (err.code == "ER_DUP_ENTRY") {
      res.status(409).json({
        message: "Course with the same name has existed",
      });
      return;
    }
    res.status(500).json({
      message: "Errors occur when deleting courses",
    });
  }
};
module.exports = {
  getCourse,
  getAllCourses,
  createCourse,
  updateCourse,
  deleteCourse,
};
