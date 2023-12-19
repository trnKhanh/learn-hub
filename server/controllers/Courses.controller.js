const Course = require("../models/Courses.model");
const Tutor = require("../models/Tutors.model");
const { validationResult, matchedData } = require("express-validator");

const createCourse = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).send(errors);
    return;
  }
  const data = matchedData(req);
  if (req.file) data.profile_picture = req.file.path;

  try {
    if (!data.owner_id) {
      data.owner_id = req.user.id;
    }
    if (data.owner_id) {
      const tutor = await Tutor.findOne({ id: data.owner_id, verified: 1 });
      if (!tutor) {
        res.status(422).json({
          message: "Owner is not verified tutor",
        });
        return;
      }
    }
    const newCourse = new Course(data);
    const course = await Course.create(newCourse);
    res.status(201).json({
      message: "Course has been created",
      course: course,
    });
  } catch (err) {
    console.log(err);

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
  try {
    const course = await Course.findOne({ id: req.params.course_id });
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
  console.log(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).send(errors);
    return;
  }
  const data = matchedData(req);
  if (req.file) data.profile_picture = req.file.path;

  console.log(data);

  if (!Object.keys(data).length) {
    res.status(400).json({
      message: "Must provide valid fields",
    });
    return;
  }

  try {
    if (data.owner_id) {
      const tutor = await Tutor.findOne({ id: data.owner_id, verified: 1 });
      if (!tutor) {
        res.status(422).json({
          message: "Owner is not verified tutor",
        });
        return;
      }
    }
    const courses = await Course.updateById(req.params.course_id, data);
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

    if (err.code == "ER_DUP_ENTRY") {
      res.status(409).json({
        message: "Course with the same name has existed",
      });
      return;
    }
    res.status(500).json({
      message: "Errors occur when updating courses' information",
    });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const courses = await Course.deleteById(req.params.course_id);
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
    res.status(500).json({
      message: "Errors occur when deleting courses",
    });
  }
};

const getCourseProgress = async (req, res) => {
  try {
    const isPaid = await Course.isPaid(req.user.id, req.params.course_id);
    const progress = await Course.getProgess(req.user.id, req.params.course_id);
    if (!progress) {
      res.status(404).json({
        message: "Course has not registered",
      });
    } else {
      res.status(200).json({
        message: "Retrieve course progress successfully",
        progress: { isPaid: isPaid, ...progress },
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Errors occur when retrieving course progress",
    });
  }
};
const registerStudent = async (req, res) => {
  try {
    await Course.register(req.user.id, req.params.course_id);
    res.status(200).json({
      message: "Course register successfully",
    });
  } catch (err) {
    console.log(err);

    if (err.code == "ER_DUP_ENTRY") {
      res.status(409).json({
        message: "User already registerd",
      });
      return;
    }
    res.status(500).json({
      message: "Errors occur when retrieving course progress",
    });
  }
};

const searchCourse = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).send(errors);
    return;
  }
  const data = matchedData(req);

  try {
    const courses = await Course.search(data);

    res.status(200).json({
      message: "Search courses' information successfully",
      courses: courses,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Errors occur when searching courses",
    });
  }
};

const addTutorToCourse = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).send(errors);
    return;
  }
  const data = matchedData(req);

  try {
    const teach_course = await Course.addTutorToCourse(
      req.params.course_id,
      req.params.tutor_id,
      data,
    );

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
    const tutor_list = await Course.getTutorList(req.params.course_id);

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
    const teach_course = await Course.updateTutorProfitRate(
      req.params.course_id,
      req.params.tutor_id,
      data.profit_rate,
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
    const teach_course = await Course.deleteTutorFromCourse(
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
  getCourse,
  getAllCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  registerStudent,
  getCourseProgress,
  searchCourse,
  addTutorToCourse,
  getCourseTutorList,
  updateTutorProfitRate,
  deleteTutorFromCourse,
};
