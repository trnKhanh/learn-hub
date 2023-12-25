const TeachCourse = require("../models/TeachCourses.model");
const { validationResult, matchedData } = require("express-validator");

const addTutorToCourse = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).send(errors);
    return;
  }
  const data = matchedData(req);

  try {
    const newTeachCourse = new TeachCourse({
      course_id: req.params.course_id,
      tutor_id: req.params.tutor_id,
      ...data,
    });

    const teach_course = await TeachCourse.create(newTeachCourse);

    res.status(201).json({
      message: "Add tutor to course successfully",
      teach_course: teach_course,
    });
  } catch (err) {
    console.log(err);

    if (err.code == "ER_DUP_ENTRY") {
      res.status(409).json({
        message: "Course with the same name has existed",
      });
      return;
    }
    if (err.code.includes("ER_NO_REFERENCED")) {
      res.status(422).json({
        message: "Given user is not a tutor",
      });
      return;
    }
    res.status(500).json({
      message: "Errors occur when adding tutor to course",
    });
  }
};

const getCourseTutorList = async (req, res) => {
  try {
    const tutor_list = await TeachCourse.findAll({
      course_id: req.params.course_id,
    });

    res.status(200).json({
      message: "Get course's tutor list successfully",
      tutor_list: tutor_list,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Errors occur when getting course's tutor list",
    });
  }
};

const updateTutorProfitRate = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).send(errors);
    return;
  }
  const data = matchedData(req);

  try {
    const teach_course = await TeachCourse.updateById(
      req.params.course_id,
      req.params.tutor_id,
      data,
    );

    if (!teach_course) {
      res.status(404).json({
        message: "Tutor is not teaching this course",
      });
    } else {
      res.status(200).json({
        message: "Tutor's profit rate have been updated",
        teach_course: teach_course,
      });
    }
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Errors occur when updating tutor's profit rate",
    });
  }
};
const deleteTutorFromCourse = async (req, res) => {
  try {
    const teach_course = await TeachCourse.deleteById(
      req.params.course_id,
      req.params.tutor_id,
    );

    if (!teach_course) {
      res.status(404).json({
        message: "Tutor is not teaching this course",
      });
    } else {
      res.status(200).json({
        message: "Tutor's have been deleted from course",
        teach_course: teach_course,
      });
    }
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Errors occur when deleting tutor from course",
    });
  }
};

module.exports = {
  addTutorToCourse,
  getCourseTutorList,
  updateTutorProfitRate,
  deleteTutorFromCourse,
};
