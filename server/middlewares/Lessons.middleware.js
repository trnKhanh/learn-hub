const Admin = require("../models/Admins.model");
const Course = require("../models/Courses.model");
const TeachCourse = require("../models/TeachCourses.model");
const LearnCourse = require("../models/LearnCourses.model");
const Lesson = require("../models/Lessons.model");

const validateLessonChangePermission = async (req, res, next) => {
  let course_id = req.course.id;
  let user_id = req.user.id;

  console.log(">>> validateLessonChangePermission: ", {
    course_id: course_id,
    user_id: user_id,
  });

  try {
    const teachCoursePromise = TeachCourse.findOne({
      tutor_id: user_id,
      course_id: course_id,
    });

    const owerCoursePromise = Course.findOne({
      owner_id: user_id,
      id: course_id,
    });

    const [teachCourse, owerCourse] = await Promise.all([
      teachCoursePromise,
      owerCoursePromise,
    ]);

    if (!teachCourse && !owerCourse) {
      res.status(403).json({
        message: "You don't have permission to change this course",
      });
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Errors occur when validating permission",
    });
  }
};

const getCourse = async (req, res, next) => {
  let course_id = req.params.course_id;
  try {
    const course = await Course.findOne({ id: course_id });
    // console.log(">>> getCourse: ", { course: course });
    if (!course) {
      res.status(404).json({
        message: "Not found course",
      });
    } else {
      req.course = course;
      next();
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Errors occur when getting course's information",
    });
  }
};

const validateLessonDeletePermission = async (req, res, next) => {
  let course_id = req.course.id;
  let user_id = req.user.id;

  try {
    const admin_promise = Admin.findOne({
      id: user_id,
      courses_access: 1,
    });

    const creator_promise = Course.findOne({
      id: course_id,
      owner_id: user_id,
    });

    const [admin, creator] = await Promise.all([
      admin_promise,
      creator_promise,
    ]);

    if (!admin && !creator) {
      res.status(403).json({
        message: "You don't have permission to delete this Lesson",
      });
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Errors occur when validating permission",
    });
  }
};

const validateLessonGetPermission = async (req, res, next) => {
  let course_id = req.course.id;
  let user_id = req.user.id;
  let lesson_id = req.params.lesson_id;

  try {
    const admin_promise = Admin.findOne({
      id: user_id,
      courses_access: 1,
    });

    const creator_promise = Course.findOne({
      id: course_id,
      owner_id: user_id,
    });

    const tutor_promise = TeachCourse.findOne({
      tutor_id: user_id,
      course_id: course_id,
    });

    const learner_promise = LearnCourse.findOne({
      student_id: user_id,
      course_id: course_id,
    });

    const isFree_promise = new Lesson({
      course_id: course_id,
    }).findOne({ isFree: 1, id: lesson_id });

    const isPublished_promise = new Lesson({
      course_id: course_id,
    }).findOne({ isPublished: 1, id: lesson_id });

    const [admin, creator, tutor, learner, isFree, isPublished] =
      await Promise.all([
        admin_promise,
        creator_promise,
        tutor_promise,
        learner_promise,
        isFree_promise,
        isPublished_promise,
      ]);

    console.log(">>> validateLessonGetPermission: ", {
      admin: admin,
      creator: creator,
      tutor: tutor,
      learner: learner,
      isFree: isFree,
      isPublished: isPublished,
    });

    if (admin || creator || tutor) {
      next();
      req.validPublish = true;
    } else if (isPublished && (learner || isFree)) {
      next();
    } else {
      res.status(403).json({
        message: "You don't have permission to get this Lesson",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Errors occur when validating permission",
    });
  }
};

module.exports = {
  validateLessonChangePermission,
  getCourse,
  validateLessonDeletePermission,
  validateLessonGetPermission,
};
