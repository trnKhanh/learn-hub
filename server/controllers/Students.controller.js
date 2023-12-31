const Student = require("../models/Students.model");
const Course = require("../models/Courses.model");
const { validationResult, matchedData } = require("express-validator");

const createStudent = async (req, res) => {
  try {
    const newStudent = new Student({ id: req.user.id });
    const student = await Student.create(newStudent);

    res.status(201).json({
      message: "Student has been created",
      student: student,
    });
  } catch (err) {
    console.log(err);

    if (err.code == "ER_DUP_ENTRY") {
      res.status(409).json({
        message: "This user is an student",
      });
      return;
    }
    res.status(500).json({
      message: "Errors occur when creating new student",
    });
  }
};

const getStudent = async (req, res) => {
  try {
    const student = await Student.findOne({ id: req.params.id });
    if (!student) {
      res.status(404).json({
        message: "Not found student",
      });
    } else {
      res.status(200).json({
        message: "Retrieve students' information successfully",
        student: student,
      });
    }
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Errors occur when getting student's information",
    });
  }
};

const getAllStudents = async (req, res) => {
  try {
    const students = await Student.getAll();
    res.status(200).json({
      message: "Retrieve students' information successfully",
      students: students,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Errors occur when getting all students' information",
    });
  }
};

// Update student information
const updateStudentById = async (req, res) => {
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
    const students = await Student.updateById(req.params.id, data);
    if (!students) {
      res.status(404).json({
        message: "Not found student id",
      });
    } else {
      res.status(200).json({
        message: "Students' information has been updated",
        students: students,
      });
    }
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Errors occur when updating students' information",
    });
  }
};

const deleteStudentById = async (req, res) => {
  try {
    const students = await Student.deleteById(req.params.id);
    if (!students) {
      res.status(404).json({
        message: "Not found student id",
      });
    } else {
      res.status(200).json({
        message: "Students have been deleted",
        students: students,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Errors occur when deleting students",
    });
  }
};
const getCourses = async (req, res) => {
  try {
    const courses = await Course.getByStudentId(req.user.id);
    res.status(200).json({
      message: "Retrieve all courses registered by student successfully",
      courses: courses,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Errors occur when gettign user's courses",
    });
  }
};
module.exports = {
  getStudent,
  getAllStudents,
  createStudent,
  updateStudentById,
  deleteStudentById,
  getCourses,
};
